
export const validateForgotPassword = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    
    return {
        isValidEmail
    };
}

export const validateResetPassword = ( password, confirmPassword) => {
    const isPasswordMatch = password === confirmPassword;
    
    return {
        isPasswordMatch,
        isValidPassword: password.length >= 5 // Simple password length check
    };
}

export const validateMyAccount = (email, password, confirmPassword) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isPasswordMatch = password === confirmPassword;
    
    return {
        isValidEmail,
        isPasswordMatch,
        isValidPassword: password.length >= 5
    };
}

export const validateLogin = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    
    return {
        isValidEmail,
        isValidPassword: password.length >= 5 // Simple password length check
    };
}

export const validateRegistration = (email, password, confirmPassword) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isPasswordMatch = password === confirmPassword;
    
    return {
        isValidEmail,
        isPasswordMatch,
        isValidPassword: password.length >= 5 // Simple password length check
    };
}

