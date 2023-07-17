import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://login-60de4-default-rtdb.firebaseio.com/data.json';

  constructor(private http: HttpClient) { }

  //Purpose: Fetch Login Data
  getLoginData() {
    return this.http.get(this.apiUrl);
  }
}
