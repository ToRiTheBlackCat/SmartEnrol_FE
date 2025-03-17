export interface User {
    token: string;
    accountId: string;
    accountName: string;
    email: string;
}

export interface authState {
    token: string | null;
    accountId: string | null;
    accountName: string | null;
    email: string | null;
    area: string | null;
} 
export interface Question {
    id: number;
    question: string;
    type: string;
    answers: string[];
}