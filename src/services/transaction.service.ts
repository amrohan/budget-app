import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { transactionModel } from 'src/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly http = inject(HttpClient)

  private apiUrl = 'http://localhost:3000'

  // http://localhost:3000/budgets/month?userId=auth0|6502b89367e9a06d1933748d&monthName=Sep&year=2023


  GetPerticularMonthTransactions(userId: string, month: string, year: string): Observable<transactionModel> {

    let params = new HttpParams()
      .set('userId', userId)
      .set('monthName', month)
      .set('year', year);

    return this.http.get<transactionModel>(`${this.apiUrl}/budgets/month`, {
      headers: { Authorization: `Bearer ${environment.transactionApi.AuthToken}` },
      params: params,
    }).pipe(
      catchError((error) => {
        console.error('There was an error!', error);
        throw error;
      })
    );
  }


}