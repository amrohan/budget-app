import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Account } from 'src/models/accounts';
import { account } from 'src/models/transaction';
import { AccountsService } from 'src/services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',

})
export class AccountsComponent implements OnInit {
  isCreateAccount = false;
  accountsList$: Observable<Account[]>
  userId: string

  accounts: account = new account();
  private readonly accountService = inject(AccountsService)
  private readonly auth = inject(AuthService)

  ngOnInit(): void {
    this.auth.user$.subscribe(res => {
      this.userId = res?.sub ?? '';
      this.accountsList$ = this.accountService.getAccountsByUserId(this.userId)
    })

  }

  showDialog() {
    this.isCreateAccount = true
  }

  onSubmit(form: NgForm) {
    form.value.userId = this.userId;
    console.log("🚀 ~ file: accounts.component.ts:20 ~ AccountsComponent ~ onSubmit ~ form:", form.value)
    this.accountService.createAccount(form.value).subscribe({
      next: (res) => {
        console.log("🚀 ~ file: accounts.component.ts:40 ~ AccountsComponent ~ this.accountService.createAccount ~ res:", res)
        this.isCreateAccount = false;
        this.accountsList$ = this.accountService.getAccountsByUserId(this.userId)

      }, error: (err) => {
        console.log("🚀 ~ file: accounts.component.ts:43 ~ AccountsComponent ~ this.accountService.createAccount ~ err:", err)
      }
    })
    form.resetForm();
  }
}
