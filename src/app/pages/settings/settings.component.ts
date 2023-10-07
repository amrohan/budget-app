import { Component } from '@angular/core';
import { timeZone } from 'src/mocks/timezones';
import { TimeZone } from 'src/models/timezone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  timezones = timeZone

  timezone: TimeZone = new TimeZone()

  setTimeZone() {

    console.log("🚀 ~ file: settings.component.ts:21 ~ SettingsComponent ~ setTimeZone :", this.timezone.timezone[0])
  }

}
