export interface UserLogin {
    username: string;
    password: string;
}

export interface AuthResponse {
    jwt: string;
}