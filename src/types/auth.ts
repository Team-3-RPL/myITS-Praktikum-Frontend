export type UserResponse = {
    "user": User,
    "token": string,
}

export type User = {
    "id": number,
    "nrp": string,
    "name": string,
    "email": string,
    "email_verified_at": string,
    "created_at": string,
    "updated_at": string,
}