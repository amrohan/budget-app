export type transactionModel = {
    transaction: transaction[];
    totalExpense: number;
    totalIncome: number;
}

export class transaction {
    _id: string
    title: string
    category: string
    amount: number;
    date: Date | string
    userId: string
    type: string
    accountName: string
}

export type transactionWithoutId = Omit<transaction, '_id'>;

export class groupedTransactions {
    date: Date | string;
    transactions: transaction[];
}

export class account {
    userId: string;
    name: string;
    amount: number;
}