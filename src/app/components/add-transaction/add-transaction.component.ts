import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { transaction } from 'src/models/transaction';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddTransactionComponent {
  addTransaction: boolean = false;

  transactionItem: transaction = new transaction();
  categoriesList: string[] = ['Food', 'Transportation', 'Entertainment', 'Healthcare', 'Other'];
  accountList: string[] = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Citi Bank', 'PNB', 'Bank of Baroda', 'IDBI', 'UCO Bank', 'Indian Bank', 'State Bank of India', 'Karnataka Bank', 'Union Bank of India', 'Kotak', 'Paytm', 'PhonePe', 'Amazon'];

  // create category with key value




  onSubmit(form: NgForm) {
    form.value.type = 'expense';
    console.log(form.value);
  }

  onIncome(form: NgForm) {
    form.value.type = 'income';
    console.log("🚀 ~ file: add-transaction.component.ts:28 ~ AddTransactionComponent ~ onIncome ~ form:", form)
  }
}
