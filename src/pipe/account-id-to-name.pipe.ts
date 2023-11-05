import { Pipe, PipeTransform } from '@angular/core';
import { Account } from 'src/models/accounts';

@Pipe({
  name: 'accountIdToName'
})
export class AccountIdToNamePipe implements PipeTransform {

  transform(accountId: string, accounts: Account[]): string {
    const account = accounts.find(account => account._id === accountId);
    return account ? account.accountName : '';
  }

}
