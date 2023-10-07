import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { transactionModel } from 'src/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly http = inject(HttpClient)

  private apiUrl = 'http://localhost:3000'

  getCurrentUserTransactions(userId: string, monthName: string, year: string): Observable<transactionModel> {
    let params = new HttpParams()
      .set('userId', userId)
      .set('monthName', monthName)
      .set('year', year);

    // Use the `retry` operator to retry the request up to a certain number of times
    return this.http.get<transactionModel>(`${this.apiUrl}/transactions/month`, { params: params })
      .pipe(
        retry(3) // Retry the request up to 3 times (you can adjust the number as needed)
      );
  }
}
