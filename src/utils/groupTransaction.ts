import { transaction, groupedTransactions } from "src/models/transaction";

export function groupTransactionsByDate(transactions: transaction[]): groupedTransactions[] {
    const groupedTransactions: groupedTransactions[] = [];
    transactions.forEach((transaction) => {
        const transactionDate = transaction.date ? new Date(transaction.date).toDateString() : '';

        // Check if a group for this date already exists
        const existingGroup = groupedTransactions.find(
            (group) => group.date === transactionDate
        );

        if (existingGroup) {
            // Check if 'transactions' property is undefined and initialize it as an empty array if needed
            if (existingGroup.transactions === undefined) {
                existingGroup.transactions = [];
            }
            // Add the transaction to the existing group's transactions array
            existingGroup.transactions.push(transaction);

            // Calculate the total expense and income for the group
            const totalExpense = existingGroup.transactions.reduce((total, transaction) => {
                return transaction.type === 'expense' ? total + transaction.amount : total;
            }, 0);

            const totalIncome = existingGroup.transactions.reduce((total, transaction) => {
                return transaction.type === 'income' ? total + transaction.amount : total;
            }, 0);

            // Calculate the net amount (total income - total expense)
            existingGroup.amount = totalIncome - totalExpense;
        } else {
            // Only add the transaction to the new group if the type is 'expense' or 'income'
            if (transaction.type === 'expense' || transaction.type === 'income') {
                // Create a new group for this date, add the transaction and initialize the amount
                groupedTransactions.push({
                    date: transactionDate,
                    amount: transaction.type === 'expense' ? -transaction.amount : transaction.amount,
                    transactions: [transaction],
                });
            }
        }
    });

    return groupedTransactions;
}





