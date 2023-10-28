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
  transaction$: Observable<transactionModel>;
  userId: string

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
        this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, 'Oct', 2023);
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  // loading transactions when user adds button
  loadTransactions(eventData: any) {
    this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, 'Oct', 2023)
  }
}
