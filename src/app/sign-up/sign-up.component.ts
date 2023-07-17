import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm !: FormGroup;
  userObject: User = new User();
  isPasswordVisible: boolean = false;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  //Purpose: For showing the password
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  //Purpose:For adding user details
  addUserData() {
    this.userObject.name = this.userForm.value.name;
    this.userObject.email = this.userForm.value.email;
    this.userObject.password = this.userForm.value.password;

    this.userService.addUserData(this.userObject).subscribe((res) => {
      this.router.navigateByUrl('/login')
      console.log("Add User Data:", res);
    });
  }

}
