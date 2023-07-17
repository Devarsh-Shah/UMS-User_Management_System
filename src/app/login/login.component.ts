import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  getLoginData: any;
  invalidCredential: boolean = false;
  isPasswordVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.fetchLoginData();
  }

  //Purpose: For showing the password
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  //Purpose: Fetching user credentials from database
  fetchLoginData() {
    this.userService.fetchUserData().subscribe((res) => {
      this.getLoginData = res;
    });
  }

  //Purpose: checking user credentials with database
  checkLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      const validCredentials = this.getLoginData.some((userData: any) => {
        return userData.email === email && userData.password === password;
      });

      if (validCredentials) {
        this.authService.login();
        this.router.navigateByUrl('dashboard');
      } else {
        this.invalidCredential = true;
        console.log('Invalid credentials');
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
