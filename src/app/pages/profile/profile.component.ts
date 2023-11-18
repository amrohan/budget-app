import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  profileJson: string;


  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }



}
