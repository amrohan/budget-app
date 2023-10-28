import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { transaction, transactionModel } from 'src/models/transaction';
import { TransactionService } from 'src/services/transaction.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
  isSetting = false
  items: MenuItem[] | undefined;
  date: Date | undefined;
  transaction$: Observable<transactionModel>;
  userId: string
  month: string
  year: string

  private transactionService = inject(TransactionService);
  private auth = inject(AuthService);


  ngOnInit(): void {
    this.items = [
      {
        label: 'Timezone',
        icon: 'pi pi-map',
        command: () => {
          this.isSetting = !this.isSetting;
        }
      }
    ]
    this.auth.user$.subscribe({
      next: (res) => {
        if (res?.sub)
          this.userId = res?.sub;
        if (this.month && this.year)
          this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, parseInt(this.month, 10), parseInt(this.year, 10))

      }, error: (err) => {
        console.log(err);

      }
    })
    this.loadFromLocal()
  }

  // loading transactions when user adds button
  loadTransactions(eventData: any) {
    this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, parseInt(this.month, 10), parseInt(this.year, 10))
  }

  onChangeMonth() {
    console.log(this.date)

    if (this.date === undefined) {
      this.date = new Date();
    } else {
      this.date = new Date(this.date);
      let month = this.date.getMonth() + 1; // Months are 1-12
      let year = this.date.getFullYear();
      this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, month, year)
      localStorage.setItem('month', month.toString());
      localStorage.setItem('year', year.toString());
    }

  }

  loadFromLocal() {
    this.month = localStorage.getItem('month') ?? '';
    this.year = localStorage.getItem('year') ?? ''
    // convert into date by using month and year 

    const monthNumber = parseInt(this.month, 10);
    const yearNumber = parseInt(this.year, 10);

    if (!isNaN(monthNumber) && !isNaN(yearNumber)) {
      const date = new Date(yearNumber, monthNumber - 1);
      this.date = date
      this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, monthNumber, yearNumber)
      console.log('i ran');

    } else {
      console.log("Invalid month or year");
    }
  }
}
