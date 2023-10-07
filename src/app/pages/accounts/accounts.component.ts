import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { account } from 'src/models/transaction';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',

})
export class AccountsComponent {
  isCreateAccount = false;

  accounts: account = new account();

  showDialog() {
    this.isCreateAccount = true
  }

  onSubmit(form: NgForm) {
    console.log("🚀 ~ file: accounts.component.ts:20 ~ AccountsComponent ~ onSubmit ~ form:", form.value)
    this.isCreateAccount = false;
    form.resetForm();

  }
}
