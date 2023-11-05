export type transactionModel = {
    transaction: transaction[];
    totalExpense: number;
    totalIncome: number;
}

export class transaction {
    _id: string
    title: string
    categoryId: string
    amount: number;
    date: Date | string
    userId: string
    type: string
    accountId: string
}

export type transactionWithoutId = Omit<transaction, '_id'>;

export class groupedTransactions {
    date: Date | string;
    amount: number
    transactions: transaction[];
}

export class account {
    userId: string;
    name: string;
    amount: number;
}