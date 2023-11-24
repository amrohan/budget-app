import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { transactionModel } from 'src/models/transaction';
import { TransactionService } from 'src/services/transaction.service';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit {
  isSetting = false
  items: MenuItem[] | undefined;
  date: Date | undefined;
  transaction$: Observable<transactionModel>;
  userName: Observable<User | null | undefined>
  userId: string
  month: string
  year: string

  // Chart js
  chart: any = []

  transactions: any = signal([])

  private transactionService = inject(TransactionService);
  private auth = inject(AuthService);


  ngOnInit(): void {
    this.items = [
      {
        label: 'Timezone',
        icon: 'pi pi-map',
        command: () => {
          this.isSetting = !this.isSetting;
        }
      }
    ]
    this.auth.user$.subscribe({
      next: (res) => {
        if (res?.sub)
          this.userId = res?.sub;
        this.loadFromLocal()
        this.createChart()

      }, error: (err) => {
        console.log(err);
      }
    })
    this.userName = this.auth.user$;
    // 

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.transactions().map((item: any) => item.name),
        datasets: [
          {
            label: 'Expenses',
            data: this.transactions().map((item: any) => item.data),
            borderWidth: 1,
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  // loading transactions when user adds button
  loadTransactions(eventData: any) {
    this.loadFromLocal()
  }

  onChangeMonth() {
    if (this.date === undefined) {
      this.date = new Date();
    } else {
      this.date = new Date(this.date);
      let month = this.date.getMonth() + 1; // Months are 1-12
      let year = this.date.getFullYear();
      this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, month, year)
      localStorage.setItem('month', month.toString());
      localStorage.setItem('year', year.toString());
    }

  }

  // loading month and year from local cache 
  loadFromLocal() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const month = parseInt(localStorage.getItem('month') ?? currentMonth.toString());
    const year = parseInt(localStorage.getItem('year') ?? currentYear.toString());

    const validMonthAndYear = !isNaN(month) && !isNaN(year);
    const finalMonth = validMonthAndYear ? month : currentMonth;
    const finalYear = validMonthAndYear ? year : currentYear;

    this.date = new Date(finalYear, finalMonth - 1);
    this.transaction$ = this.transactionService.getTransactionByMonthandYear(this.userId, finalMonth, finalYear);
    this.transaction$.subscribe({
      next: (res) => {
        this.transactions.set(res.transaction)
        const chartDatas = this.transactions().map((item: any) => {
          const date = new Date(item.date);
          const name = date.getDate()
          return {
            name: name,
            data: item.amount
          };
        });
        const chartData = chartDatas.sort(
          (a: any, b: any) => a.name - b.name,
        );

        // If the chart doesn't exist, create it
        if (!this.chart) {
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: chartData.map((item: any) => item.name),
              datasets: [
                {
                  label: 'Expenses',
                  data: chartData.map((item: any) => item.data),
                  borderWidth: 1,
                  tension: 0.1,
                  fill: false,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          //Updating chart data if available
          this.chart.data.labels = chartData.map((item: any) => item.name);
          this.chart.data.datasets[0].data = chartData.map((item: any) => item.data);
          this.chart.update();
        }
      }
    })



  }


  createChart() {
    let chartData: any = []

    this.transaction$.subscribe({
      next: (data) => {


        // const chartDatas = data.transaction.map(item => {
        //   const date = new Date(item.date);
        //   const name = date.getDate()
        //   return {
        //     name: name,
        //     data: item.amount
        //   };

        // });
        // chartData = chartDatas.sort(
        //   (a: any, b: any) => a.name - b.name,
        // );
        // this.chart = new Chart('canvas', {
        //   type: 'line',
        //   data: {
        //     labels: chartData.map((item: any) => item.name),
        //     datasets: [
        //       {
        //         label: 'Expenses',
        //         data: chartData.map((item: any) => item.data),
        //         borderWidth: 1,
        //         tension: 0.1,
        //         fill: false,
        //       },
        //     ],
        //   },
        //   options: {
        //     scales: {
        //       y: {
        //         beginAtZero: true,
        //       },
        //     },
        //   },
        // });

      },
      error: (err) => {
        console.log(err);

      }
    })

  }
}
