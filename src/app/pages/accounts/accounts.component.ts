import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Account } from 'src/models/accounts';
import { AccountsService } from 'src/services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',

})
export class AccountsComponent implements OnInit {
  isCreateAccount = false;
  accountsList$: Observable<Account[]>
  userId: string
  isCardOpen: boolean = false

  accounts: Account = new Account();
  private readonly accountService = inject(AccountsService)
  private readonly auth = inject(AuthService)

  ngOnInit(): void {
    this.auth.user$.subscribe(res => {
      this.userId = res?.sub ?? '';
      this.fetchAccounts()
    })

  }

  fetchAccounts() {
    this.accountsList$ = this.accountService.getAccountsByUserId(this.userId)

  }

  showDialog() {
    this.isCreateAccount = true
  }

  onCardClick(id: string) {
    this.isCardOpen = !this.isCardOpen;
    if (id) {
      console.log(id);
      this.accountService.getAccountByAccountId(id).subscribe({
        next: (res) => {
          this.accounts = res;
          console.log("🚀 ~ file: accounts.component.ts:32 ~ AccountsComponent ~ onCardClick ~ res:", res)

        }, error: (err) => {
          console.log(err);
        }
      })

    }
  }


  updateAccount(form: NgForm) {
    const { _id, ...account } = this.accounts
    if (_id) {
      this.accountService.updateAccountById(_id, account).subscribe({
        next: (res) => {
          this.isCardOpen = !this.isCardOpen
          this.fetchAccounts()
          form.resetForm();
        },
        error: (err) => {
          this.isCardOpen = !this.isCardOpen
          console.log(err);
        }
      })

    }
  }

  deleteAccount() {
    if (this.accounts._id) {
      this.accountService.deleteAccountById(this.accounts._id).subscribe({
        next: (res) => {
          this.isCardOpen = !this.isCardOpen
          this.fetchAccounts()
        }, error: (err) => {
          console.log(err);
        }
      })
    }

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
