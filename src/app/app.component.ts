import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'myApp';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.isLoggedIn = this.authService.isAuthenticated;
    this.authService.isAuthenticatedChanged.subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });

  }

  //Purpose: call logout method from authservice
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
