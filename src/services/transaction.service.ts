import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { transactionModel } from 'src/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly http = inject(HttpClient)

  private apiUrl = 'http://localhost:3000'

  // http://localhost:3000/budgets/month?userId=auth0|6502b89367e9a06d1933748d&monthName=Sep&year=2023




}