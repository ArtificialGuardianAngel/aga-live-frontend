export interface IContract {
    _id: string;
    documentId: string;
    createdAt?: Date;
    revokedAt?: Date;
    completedAt?: Date;

    amount: number;
}
