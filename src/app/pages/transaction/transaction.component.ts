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
        this.loadFromLocal()
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  // loading transactions when user adds button
  loadTransactions(eventData: any) {
    this.loadFromLocal()
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

  // loading month and year from local cache 
  loadFromLocal() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const month = parseInt(localStorage.getItem('month') ?? currentMonth.toString());
    const year = parseInt(localStorage.getItem('year') ?? currentYear.toString());

    const validMonthAndYear = !isNaN(month) && !isNaN(year);
    const finalMonth = validMonthAndYear ? month : currentMonth;
    const finalYear = validMonthAndYear ? year : currentYear;

    this.date = new Date(finalYear, finalMonth - 1);
    this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, finalMonth, finalYear);
  }

}
