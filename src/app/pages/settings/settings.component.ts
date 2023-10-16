import { Component, inject } from '@angular/core';
import { timeZone } from 'src/mocks/timezones';
import { TimeZone } from 'src/models/timezone';
import { transaction } from 'src/models/transaction';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  timezones = timeZone
  timezone: TimeZone = new TimeZone()

  private readonly timezoneService = inject(TransactionService)

  setTimeZone() {
    let tmz: TimeZone = {
      timezone: this.timezone.timezone[0],
      userId: ''

    }
    this.timezoneService.SetTimeZone(tmz).subscribe(res => { console.log(res) })
    console.log("🚀 ~ file: settings.component.ts:21 ~ SettingsComponent ~ setTimeZone :", this.timezone.timezone[0])
  }

}
