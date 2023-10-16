import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { TimeZone } from 'src/models/timezone';
import { transaction, transactionModel } from 'src/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly http = inject(HttpClient)
  private readonly baseUrl = environment.backend.ApiUrl
  headers = new HttpHeaders().set(
    "Authorization",
    "Bearer " + environment.backend.AuthToken
  )

  getAllTransactions(): Observable<transactionModel> {
    // pass with credentials and with Beare token
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + environment.backend.AuthToken
    );
    return this.http.get<transactionModel>(`${this.baseUrl}/transactions`, { headers: headers })
  }

  getTransactionByMonthandYear(userId: string, month: string, year: number): Observable<transactionModel> {
    let parmas = new HttpParams()
      .set('month', month)
      .set('year', year.toString());

    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + environment.backend.AuthToken
    )

    return this.http.get<transactionModel>(`${this.baseUrl}/transactions/user/${userId}`, { headers: this.headers, params: parmas })
  }

  // create Transaction
  addTransaction(transaction: transaction): Observable<transaction> {
    return this.http.post<transaction>(`${this.baseUrl}/transactions`, transaction, { headers: this.headers })

  }

  // Timezone 
  SetTimeZone(tmz: TimeZone): Observable<TimeZone> {
    return this.http.post<TimeZone>(`${this.baseUrl}/timezone`, tmz, { headers: this.headers })
  }


}

