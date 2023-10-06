import { Component, OnInit, isDevMode, Inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'budget-app';
  isAuthenticated: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, @Inject(DOCUMENT) private document: Document,
    public auth: AuthService) { }

  ngOnInit() {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
    this.primengConfig.ripple = true;
    this.auth.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success;
    });
  }
  // public signOut(): void {
  //   this.authService.logout({
  //     ret(url) {
  //       window.location.replace(url);
  //     }
  //   });
  // }
}
