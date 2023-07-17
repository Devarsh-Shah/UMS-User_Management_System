import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm !: FormGroup;
  userObject: User = new User();
  userList: any = [];
  userId: string = '';
  userDetails: User = new User();
  isPasswordVisible: boolean = false;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.fetchUserData();
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

  //Purpose:For fetching user details
  fetchUserData() {
    this.userService.fetchUserData().subscribe((res: any) => {
      this.userList = Object.values(res);
      this.userDetails = this.userList.find((element: any) => element.id === this.userId);
      this.editUserData();
    });
  }

  //Purpose:For edding user details
  editUserData() {
    this.userForm.patchValue({
      id: this.userDetails.id,
      name: this.userDetails.name,
      email: this.userDetails.email,
      password: this.userDetails.password,
    });
  }

  //Purpose:For updating user details
  updateUserData() {
    this.userObject.id = this.userForm.value.id;
    this.userObject.name = this.userForm.value.name;
    this.userObject.email = this.userForm.value.email;
    this.userObject.password = this.userForm.value.password;

    this.userService.updateUserData(this.userObject.id, this.userObject).subscribe((res) => {
      this.router.navigateByUrl('/dashboard');
      console.log('Update Data', res);
    })
  }

  //Purpose:For deleting user details by id
  deleteUserData() {
    this.userService.deleteUserData(this.userId).subscribe((res) => {
      this.router.navigateByUrl('/dashboard');
      console.log("Delete User Data:", res);
    });
  }
}
