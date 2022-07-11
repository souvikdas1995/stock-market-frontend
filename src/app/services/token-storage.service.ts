import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: String): void {
   console.log("decoded "+user)
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user)); 
  }
 
  public getUser(): any {
    try{
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log("user "+user);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  catch{
    return {};
  }
  }
  public isAdmin(){
    try{
    const role = this.decode(this.getUser()).authorities;
    if(role[0]=== 'ROLE_ADMIN'){
        console.log("returning true from isUser()");
        return true;
        }
        return false;
      }
      catch{
        return false;
      }
 }
 public isUser(){
   try{
  const role = this.decode(this.getUser()).authorities;
  console.log(role[0]);
  if(role[0]=== 'ROLE_USER'||role[0]=== 'ROLE_ADMIN')
    {
      console.log("returning true from isUser()");
      return true;
    }
      return false;
  }
  catch{
    return false;
  }
}
 private decode(token: string) {
  try {
      return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
      console.log("error decoding token");
  }
}
}