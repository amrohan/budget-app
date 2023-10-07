import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { groupedTransactions, transaction, transactionModel } from 'src/models/transaction';
import { groupTransactionsByDate } from 'src/utils/groupTransaction';

type Transaction = {
  id: number,
  name: string,
  date: string,
  category: string,
  amount: number,
  transactionType: "Income" | "Expense",
  account: string;
}
@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',

})
export class TransactionCardComponent {
  @Input() transactions!: transaction[];

  items: MenuItem[] | undefined;
  isFilterOpen: boolean = false;
  groupedTransactions: groupedTransactions[] = [];


  ngOnInit() {
    this.items = [
      {
        label: 'Price',
        command: () => {
          alert("You clicked priced")
          this.isFilterOpen = !this.isFilterOpen
        },
        icon: 'pi pi-dollar'
      },
      {
        label: 'Date',
      }
    ];

    this.groupedTransactions = groupTransactionsByDate(this.transactions);
    this.groupedTransactions.sort((a, b) => {
      const dateA = new Date(a.date ?? '').getTime();
      const dateB = new Date(b.date ?? '').getTime();
      return dateB - dateA;
    });


  }

}
