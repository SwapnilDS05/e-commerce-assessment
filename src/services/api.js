import axios from 'axios';
import { clearLocalStorage, decryptData, storeToken } from '../utils/commonMethods';
import { ENDPOINTS } from './endpoints';

const BASE_URL = 'https://ecommerceproject.24livehost.com/api/v1';

const axiosConfig = axios.create({
    baseURL: BASE_URL, //replace with your BaseURL
    headers: {
        'Content-Type': 'application/json', // change according header type accordingly
        Accept: 'application/json',
    },
});

axiosConfig.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken'); // get stored access token
        const decAccessToken = decryptData(accessToken);
        if (decAccessToken) {
            config.headers.Authorization = `Bearer ${decAccessToken}`; // set in header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosConfig.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const decRefreshToken = decryptData(refreshToken);
            if (decRefreshToken) {
                try {
                    const response = await axios.post(`${BASE_URL}/${ENDPOINTS.REFRESH_TOKEN}`, { refreshToken: decRefreshToken });
                    const data = response.data;
                    storeToken(data);
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                    return axios(originalRequest); //recall Api with new token
                } catch (error) {
                    clearLocalStorage();
                }
            }
        } else if (error.response.status >= 500) {
            return {
                data: null,
                message: 'An unexpected error occurred. Please try again later.',
                status: 'Error',
            };
        } else {
            return {
                data: null,
                message: error.response?.data?.message || 'Something went wrong!',
                status: 'Error',
            };
        }
    }
);

export async function postRequest(requestUrl, body, signal) {
    try {
        const response = await axiosConfig.post(requestUrl, body, { signal: signal });
        return response;        
    } catch (error) {
        return error;
    }
}

export async function getRequest(requestUrl, signal) {
    try {
        const response = await axiosConfig.get(requestUrl, { signal: signal });
        return response;        
    } catch (error) {
        return error;
    }
}

export async function putRequest(requestUrl, body, signal) {
    try {
        const response = await axiosConfig.put(requestUrl, body, { signal: signal });
        return response;        
    } catch (error) {
        return error;
    }
}

export async function deleteRequest(requestUrl, signal) {
    try {
        const response = await axiosConfig.delete(requestUrl, { signal: signal });
        return response;        
    } catch (error) {
        return error;
    }
}
