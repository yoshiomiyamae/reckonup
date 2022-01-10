export interface JwtData {
    exp: number;
    iat: number;
    jti: string;
    token_type: 'access' | 'refresh';
    user_id: number;
}