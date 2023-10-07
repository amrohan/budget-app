import { transaction, groupedTransactions } from "src/models/transaction";

// export function groupTransactionsByDate(transactions: transaction[]): transaction[] {
//     const groupedTransactions: groupedTransactions[] = [];
//     transactions.forEach((transaction) => {
//         const transactionDate = transaction.date ? new Date(transaction.date).toDateString() : '';

//         // Check if a group for this date already exists
//         const existingGroup = groupedTransactions.find(
//             (group) => group.date === transactionDate
//         );

//         if (existingGroup) {
//             // Add the transaction to the existing group
//             if (!existingGroup.transactions) existingGroup.transactions = [];
//         } else {
//             // Create a new group for this date and add the transaction
//             groupedTransactions.push({
//                 date: transactionDate,
//                 transactions: [transaction],
//             });
//         }
//     });

//     return groupedTransactions;
// }

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
        } else {
            // Create a new group for this date and add the transaction
            groupedTransactions.push({
                date: transactionDate,
                transactions: [transaction],
            });
        }
    });

    return groupedTransactions;
}


