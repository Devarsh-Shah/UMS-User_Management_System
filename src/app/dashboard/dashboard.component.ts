import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userForm !: FormGroup;
  userObject: User = new User();
  userList: any = [];
  selectedUserList: any = [];

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.fetchUserData();
  }

  //Purpose:For fetching user details
  fetchUserData() {
    this.userService.fetchUserData().subscribe((res: any) => {
      this.userList = Object.values(res);
      console.log("Fetch User Data:", res);
    });
  }

  //Purpose: Selecting user for delete record from database
  onSelectedUser(event: any) {
    const selectedUser = JSON.parse(event.target.value);

    if (event.target.checked) {
      const userExists = this.selectedUserList.some((user: any) => user.id === selectedUser.id);

      if (!userExists) {
        this.selectedUserList.push({ ...selectedUser });
      }
    } else {
      const indexToRemove = this.selectedUserList.findIndex((user: any) => user.id === selectedUser.id);

      if (indexToRemove !== -1) {
        this.selectedUserList.splice(indexToRemove, 1);
      }
    }
    console.log("selectedUserList", this.selectedUserList);
  }

  //Purpose: Delete selected user from database
  deleteSelectedUsers(): void {
    this.selectedUserList.forEach((user: any) => {
      this.userService.deleteUserData(user.id).subscribe(
        () => {
          console.log('User data deleted successfully:', user.id);
          this.fetchUserData();

          const indexToRemove = this.selectedUserList.findIndex((u: any) => u.id === user.id);
          if (indexToRemove !== -1) {
            this.selectedUserList.splice(indexToRemove, 1);
          }
        },
        (error: any) => {
          console.error('Error deleting user data:', error);
        }
      );
    });
  }

  //Purpose: Selecting all user 
  toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox') as HTMLInputElement;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#selectAllCheckbox)');

    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = selectAllCheckbox.checked;
      const event = new Event('change');
      checkbox.dispatchEvent(event);
    });
  }

  //Purpose: Check all users are selected 
  isAllSelected() {
    return this.selectedUserList.length === this.userList.length;
  }

  //Purpose: Check user is selected 
  isSelected(user: any) {
    return this.selectedUserList.some((selectedUser: any) => selectedUser.id === user.id);
  }

}
