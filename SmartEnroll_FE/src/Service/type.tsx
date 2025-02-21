export interface User{
    accountId: string,
    token: string;
}
export interface authState{
    accountId: string | null,
    token: string | null,
}