import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { CategoryComponent } from './pages/category/category.component';
import { SettingsComponent } from './pages/settings/settings.component';


const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },

  {
    path: "dashboard",
    component: TransactionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "accounts",
    component: AccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
