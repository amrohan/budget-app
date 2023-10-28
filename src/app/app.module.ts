import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { LayoutComponent } from './components/layout/layout.component';

// PrimeNg Imports
import { TransactionCardComponent } from './components/ui/transaction-card/transaction-card.component';
import { MenuModule } from 'primeng/menu';
import { BottomNavComponent } from './components/ui/bottom-nav/bottom-nav.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CategoryComponent } from './pages/category/category.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';


@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    LayoutComponent,
    TransactionCardComponent,
    BottomNavComponent,
    AccountsComponent,
    SignInComponent,
    AddTransactionComponent,
    CategoryComponent,
    SettingsComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
      },
    }),
    AppRoutingModule,
    HttpClientModule,
    // Prime Ng Imports
    MenuModule,
    SidebarModule,
    TabViewModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    FieldsetModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
