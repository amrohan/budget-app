export type transactionModel = {
    transaction: transaction[];
    totalExpense: number;
    totalIncome: number;
}

export class transaction {
    id?: string;
    title?: string;
    category?: string;
    amount?: number;
    date?: Date | string;
    userId?: string;
    type?: string;
    accountName?: string;

}

export class groupedTransactions {
    date?: Date | string;
    transactions?: transaction[];
}