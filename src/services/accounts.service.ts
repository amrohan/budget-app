import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, AccountWithoutId } from 'src/models/accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private readonly http = inject(HttpClient)
  private readonly baseUrl = environment.backend.ApiUrl
  headers = new HttpHeaders().set(
    "Authorization",
    "Bearer " + environment.backend.AuthToken
  )

  getAccountsByUserId(userId: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts/user/${userId}`, { headers: this.headers })
  }

  getAccountByAccountId(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/${accountId}`, { headers: this.headers })
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.baseUrl}/accounts`, account, { headers: this.headers })
  }

  updateAccountById(id: string, account: AccountWithoutId): Observable<Account> {
    return this.http.put<Account>(`${this.baseUrl}/accounts/${id}`, account, { headers: this.headers })
  }

  deleteAccountById(accountId: string): Observable<Account> {
    return this.http.delete<Account>(`${this.baseUrl}/accounts/${accountId}`, { headers: this.headers })
  }

}


