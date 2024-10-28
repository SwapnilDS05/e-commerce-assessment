import CryptoJS from "crypto-js";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, "dataEncode#$%").toString();
};

export const decryptData = (data) => {
  let decryptedData = null;
  if (data !== null) {
    const bytes = CryptoJS.AES.decrypt(data, "dataEncode#$%");
    decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  }

  return decryptedData;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("userLogin");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  window.location.href = '/';
}

export const storeToken = (data) => {
  localStorage.setItem("refreshToken", encryptData(data.refresh_token));
  localStorage.setItem("accessToken", encryptData(data.access_token));
}
