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
  isSorted: boolean = true;
  groupedTransactions: groupedTransactions[] = [];


  ngOnInit() {
    this.items = [
      {
        label: 'Date',
        icon: this.isSorted ? 'pi pi-sort-amount-down' : 'pi pi-sort-amount-up',
        command: () => {
          this.isSorted = !this.isSorted;
          this.groupedTransactions.reverse()
          this.updateDateMenuItem();
          this.isFilterOpen = !this.isFilterOpen

        }
      }
    ];

    this.groupedTransactions = groupTransactionsByDate(this.transactions);
    this.groupedTransactions.sort((a, b) => {
      const dateA = new Date(a.date ?? '').getTime();
      const dateB = new Date(b.date ?? '').getTime();
      return dateB - dateA;
    });
  }


  // Sorting the ttems array based on the date
  updateDateMenuItem() {
    if (!this.items)
      return;
    const dateItem = this.items.find(item => item.label === 'Date');
    if (dateItem) {
      dateItem.icon = this.isSorted ? 'pi pi-sort-amount-down' : 'pi pi-sort-amount-up';
      this.items = this.items.map(item => item.label === 'Date' ? dateItem : item);
    }
  }

}
