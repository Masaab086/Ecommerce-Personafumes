export interface RegisterFormModel {
    firstName: string,
    lastName: string,
    userEmail: string,
    userPassword: string,
    confirmPassword: string,
    phone: string,
    gender: string,
    day: number,
    month: number,
    year: number,
    recordInfo: boolean,
    sendInfo: boolean
}

export interface ForgetPasswordModel {
    email: string;
}

export interface ResetPasswordModel {
    password: string;
    confirmPassword: string;
}