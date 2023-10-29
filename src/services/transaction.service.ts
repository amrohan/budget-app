import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TimeZone } from 'src/models/timezone';
import { transaction, transactionModel, transactionWithoutId } from 'src/models/transaction';

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


  // Get transactions
  getAllTransactions(): Observable<transactionModel> {
    // pass with credentials and with Beare token
    let headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + environment.backend.AuthToken
    );
    return this.http.get<transactionModel>(`${this.baseUrl}/transactions`, { headers: headers })
  }



  // get transaction by user id
  getTransactionsByUserId(userId: string): Observable<transaction> {
    return this.http.get<transaction>(`${this.baseUrl}/transactions/all/${userId}`, { headers: this.headers })
  }
  // get transaction by month and year
  getTransactionByMonthandYear(userId: string, month: number, year: number): Observable<transactionModel> {
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
  // update Transaction
  updateTransaction(id: string, transaction: transactionWithoutId): Observable<transactionWithoutId> {
    return this.http.put<transactionWithoutId>(`${this.baseUrl}/transactions/${id}`, transaction, { headers: this.headers })
  }
  // delete Transaction
  deleteTransaction(transactionId: string): Observable<transaction> {
    return this.http.delete<transaction>(`${this.baseUrl}/transactions/${transactionId}`, { headers: this.headers })
  }

  // Timezone 
  SetTimeZone(tmz: TimeZone): Observable<TimeZone> {
    return this.http.post<TimeZone>(`${this.baseUrl}/timezone`, tmz, { headers: this.headers })
  }


}

