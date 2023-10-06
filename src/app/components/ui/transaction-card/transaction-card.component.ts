import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { transaction, transactionModel } from 'src/models/transaction';

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


  ngOnInit() {
    this.items = [
      {
        label: 'Price',
        command: () => {
          alert("You clicked priced")
          this.isFilterOpen = !this.isFilterOpen
        }
      },
      {
        label: 'Date',
      }
    ];
  }

}
