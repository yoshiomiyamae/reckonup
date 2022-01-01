import { User } from "./system";

export interface Jwt {
    access: string;
    refresh: string;
}

export interface LoginResponse {
    isLoggedIn: boolean;
    jwtToken?: string;
    refreshToken?: string;
    user?: User;
    loginErrorMessage?: string;
}

export interface JwtData {
    exp: number;
    iat: number;
    jti: string;
    token_type: 'access' | 'refresh';
    user_id: number;
}