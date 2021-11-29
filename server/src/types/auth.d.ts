export interface AuthResult {
    status: number,
    token: string | undefined,
    user?: UserResult | null,
    msg?: string
}

export interface UserResult {
    id: number,
    email: string,
    username: string,
    photoUrl: string,
    online: boolean
}