import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Account } from 'src/models/accounts';
import { Category } from 'src/models/category';
import { transaction } from 'src/models/transaction';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTransactionComponent implements OnInit {
  addTransaction: boolean = false;
  @Input() userId: string
  @Input() categoriesList: Category[]
  @Input() accountList: Account[]
  @Output() loadTransaction = new EventEmitter<boolean>();

  transactionItem: transaction = new transaction();

  private readonly transactionService = inject(TransactionService)
  private readonly auth = inject(AuthService)

  ngOnInit(): void {
    this.auth.user$.subscribe(res => {
      if (res?.sub)
        this.userId = res.sub;
    })

  }

  onAddClick() {
    this.addTransaction = !this.addTransaction
    this.transactionItem.date = new Date()
  }



  onSubmit(form: NgForm) {
    form.value.type = 'expense';
    form.value.userId = this.userId
    this.addTransaction = !this.addTransaction
    this.transactionService.addTransaction(form.value).subscribe(res => {
      console.log(res)
      this.loadTransaction.emit(true);
    })
    form.resetForm();
  }

  onIncome(form: NgForm) {
    form.value.type = 'income';
    form.value.userId = this.userId
    this.addTransaction = !this.addTransaction
    this.transactionService.addTransaction(form.value).subscribe(res => {
      console.log(res)
      this.loadTransaction.emit(true);
    })
    form.resetForm();



  }
}
