export interface User {
    email?: string,
    photoUrl: string,
    username: string,
    id: number | null,
    online: boolean,
    error?: string
}