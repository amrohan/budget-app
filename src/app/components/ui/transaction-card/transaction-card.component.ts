import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Account } from 'src/models/accounts';
import { Category, CategoryWithoutId } from 'src/models/category';
import { groupedTransactions, transaction, transactionModel, transactionWithoutId } from 'src/models/transaction';
import { AccountsService } from 'src/services/accounts.service';
import { CategoryService } from 'src/services/category.service';
import { TransactionService } from 'src/services/transaction.service';
import { groupTransactionsByDate } from 'src/utils/groupTransaction';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',

})
export class TransactionCardComponent {
  @Input() transactions!: transaction[];
  @Input() userId: string

  // Delete Id this.transa
  @Output() reRender = new EventEmitter<boolean>;

  items: MenuItem[] | undefined;

  cardItems: MenuItem[] | undefined;
  isFilterOpen: boolean = false;
  clickedItemId: string;
  isCardOpen: boolean = false;
  isEditing: boolean = false;
  isSorted: boolean = true;
  transactionItem: transaction = new transaction();
  groupedTransactions: groupedTransactions[] = [];
  categoriesList: string[]
  accountList: string[]
  typeList: string[] = ['expense', 'income']

  private readonly categoryService = inject(CategoryService)
  private readonly accountService = inject(AccountsService)
  private readonly transactionService = inject(TransactionService)


  ngOnInit() {
    this.items = [
      {
        label: 'Date',
        icon: this.isSorted ? 'pi pi-sort-amount-down' : 'pi pi-sort-amount-up',
        command: () => {
          this.isSorted = !this.isSorted;
          this.groupedTransactions.reverse()
          this.updateDateMenuItem();
          this.isFilterOpen = !this.isFilterOpen

        }
      }
    ];

    this.cardItems = [
      {
        // add random id as per cards
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
          // Find transaction
          const toUpdate = this.transactions.find(transaction => transaction._id === this.clickedItemId);
          if (toUpdate) {
            let date = new Date(toUpdate.date);
            this.transactionItem = toUpdate;
            this.transactionItem.date = date;
            console.log("🚀 ~ file: transaction-card.component.ts:62 ~ TransactionCardComponent ~ ngOnInit ~ toUpdate:", toUpdate)

            this.isEditing = true;
          }

        }
      },
      //delete
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          console.log('Delete')
          this.deleteTransaction(this.clickedItemId)
        }
      }
    ]

    this.groupedTransactions = groupTransactionsByDate(this.transactions);
    this.groupedTransactions.sort((a, b) => {
      const dateA = new Date(a.date ?? '').getTime();
      const dateB = new Date(b.date ?? '').getTime();
      return dateB - dateA;
    });

    // getting categories
    this.categoryService.getCategoriesByUserId(this.userId).subscribe({
      next: (res) => {
        this.categoriesList = res.map((item: Category) => {
          return item.categoryName
        })
      }, error: (err) => {
        console.log("🚀 ~ file: add-transaction.component.ts:42 ~ AddTransactionComponent ~ this.categoryService.getCategoriesByUserId ~ err:", err)

      }
    })

    // getting accounst
    this.accountService.getAccountsByUserId(this.userId).subscribe({
      next: (res) => {
        this.accountList = res.map((item) => { return item.accountName })
      },
      error: (err) => {
        console.log("🚀 ~ file: add-transaction.component.ts:49 ~ AddTransactionComponent ~ this.accountService.getAccountsByUserId ~ err:", err)

      }
    })
  }

  onCardClick(_id: string) {
    console.log(_id);
    this.clickedItemId = _id;
    this.isCardOpen = !this.isCardOpen;
  }

  // Sorting the ttems array based on the date
  updateDateMenuItem() {
    if (!this.items)
      return;
    const dateItem = this.items.find(item => item.label === 'Date');
    if (dateItem) {
      dateItem.icon = this.isSorted ? 'pi pi-sort-amount-down' : 'pi pi-sort-amount-up';
      this.items = this.items.map(item => item.label === 'Date' ? dateItem : item);
    }
  }


  // Update transaction
  updateTransaction(id: string, transaction: transactionWithoutId) {
    this.transactionService.updateTransaction(id, transaction).subscribe({
      next: (res) => {
        console.log(res);
        this.reRender.emit(true);
        this.isCardOpen = false;
        this.clickedItemId = '';
        this.isFilterOpen = false;
      }
      , error: (err) => {
        console.log(err);
      }
    })
  }

  onSubmit(form: NgForm) {
    this.isEditing = false
    const { _id, ...res } = this.transactionItem


    this.updateTransaction(_id, res)

  }

  // Delete Transaction
  deleteTransaction(_id: string) {
    this.transactionService.deleteTransaction(_id).subscribe({
      next: (res) => {
        console.log(res);
        this.reRender.emit(true);
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  addTransactionEmit() {

    this.reRender.emit(true);
  }
}
