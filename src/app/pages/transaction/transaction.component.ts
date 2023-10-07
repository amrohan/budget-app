import { Component, OnInit, inject } from '@angular/core';
import { transactionModel } from 'src/models/transaction';
import { TransactionService } from 'src/services/transaction.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
  transactions: transactionModel = {
    "transaction": [
      {
        "id": "650f042fff141cf2e448df86",
        "title": "Pizza",
        "category": "Personal",
        "amount": 40,
        "date": "2023-08-23T15:28:46.447Z",
        "userId": "auth0|6502b89367e9a06d1933748d",
        "type": "expense",
        "accountName": 'Paytm'
      },
      {
        "id": "650f040bff141cf2e448df83",
        "title": "Shawrma",
        "category": "Food",
        "amount": 80,
        "date": "2023-09-23T15:28:10.531Z",
        "userId": "auth0|6502b89367e9a06d1933748d",
        "type": "expense",
        "accountName": 'kotak'
      },
      {
        "id": "650f040bff141cf2e448df83",
        "title": "Oil Money",
        "category": "Food",
        "amount": 100,
        "date": "2023-09-23T18:28:10.531Z",
        "userId": "auth0|6502b89367e9a06d1933748d",
        "type": "income",
        "accountName": 'kotak'
      },
    ],
    "totalExpense": 2963,
    "totalIncome": 440

  };

  // private transactionService = inject(TransactionService);
  ngOnInit(): void {

  }

}
