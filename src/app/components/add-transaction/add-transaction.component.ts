import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
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
  @Output() loadTransaction = new EventEmitter<boolean>();

  transactionItem: transaction = new transaction();
  // userId: string;
  categoriesList: string[] = ['Food', 'Transportation', 'Entertainment', 'Healthcare', 'Other'];
  accountList: string[] = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Citi Bank', 'PNB', 'Bank of Baroda', 'IDBI', 'UCO Bank', 'Indian Bank', 'State Bank of India', 'Karnataka Bank', 'Union Bank of India', 'Kotak', 'Paytm', 'PhonePe', 'Amazon'];

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
    console.log(form.value);
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
    form.resetForm();


  }
}
