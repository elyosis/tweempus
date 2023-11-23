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
    if (this.authService.token != null) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authService.logout()
  }
}
