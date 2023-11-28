import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'tweempus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService) {

  }

  checkLoginStatus() {
    if (this.authService.checkLogin("1")) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authService.logout()
  }
}
