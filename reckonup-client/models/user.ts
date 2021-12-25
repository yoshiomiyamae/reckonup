export interface User {
    id: number;
    isActive: boolean;
    lastLogin?: Date;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}