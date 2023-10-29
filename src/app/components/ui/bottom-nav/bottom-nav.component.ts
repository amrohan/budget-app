import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent implements OnInit {
  isShowMenu: boolean = false;

  private router = inject(Router)
  activeRoute?: string;

  onToggleMenu() {
    this.isShowMenu = !this.isShowMenu
  }
  ngOnInit() {
    // get currrent url name

    this.activeRoute = this.router.url.split('/')[1]


  }

}
