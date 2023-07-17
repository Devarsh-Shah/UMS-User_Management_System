import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://user-e38c5-default-rtdb.firebaseio.com/user.json';

  //Purpose: Add user data
  addUserData(body: any) {
    return this.http.post(this.apiUrl, body);
  }

  //Purpose: Fetch user data
  fetchUserData() {
    return this.http.get('https://user-e38c5-default-rtdb.firebaseio.com/user.json')
      .pipe(map((res: any) => {
        const sign = [];

        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            console.log("service", key)
            sign.push({ ...res[key], id: key })
          }
        }
        return sign;
      }))
  }

  //Purpose: Delete user data
  deleteUserData(id: any) {
    return this.http.delete('https://user-e38c5-default-rtdb.firebaseio.com/user/' + id + '.json');
  }

  //Purpose: Update user data
  updateUserData(id: any, value: User) {
    return this.http.put('https://user-e38c5-default-rtdb.firebaseio.com/user/' + id + '.json', value);
  }
}
