import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isAuthenticated = false;
  private readonly AUTH_KEY = 'authenticated';
  isAuthenticatedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  //Purpose: Getter for isAuthenticated value
  get isAuthenticated(): boolean {
    this._isAuthenticated = localStorage.getItem(this.AUTH_KEY) === 'true';
    return this._isAuthenticated;
  }

  //Purpose: Setter for isAuthenticated value
  set isAuthenticated(value: boolean) {
    if (value) {
      localStorage.setItem(this.AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(this.AUTH_KEY);
    }
    this._isAuthenticated = value;
    this.isAuthenticatedChanged.emit(value);
  }

  //Purpose: Set isAuthenticated flag value true
  login(): void {
    this.isAuthenticated = true;
  }

  //Purpose: Set isAuthenticated flag value false
  logout(): void {
    this.isAuthenticated = false;
  }

  //Purpose: Get isAuthenticated flag from localstorage
  isAuthenticatedUser(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}
