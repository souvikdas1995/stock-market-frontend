import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/register-user.model';
import { Roles } from '../models/roles.model';

const AUTH_API = 'http://localhost:8083/authenticate/';

const httpOptionsforSignUp = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/x-www-form-urlencoded');
headers_object.append("Authorization", "Basic " + btoa("testjwtclientid:XY7kmzoNzl100"));

const httpOptionsforLogin = {
  headers: headers_object
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(logiUser: any): Observable<any> {
    return this.http.post(AUTH_API + 'oauth/token', logiUser, httpOptionsforLogin);
  }

  register(registerUser: any): Observable<any> {
    let registerUserObject = {} as RegisterUser;
    let roles=[] as Array<Roles>;
    registerUserObject.roles=[];
    console.log(registerUser);
    registerUserObject.name=registerUser.name;
    registerUserObject.password=registerUser.password;
    registerUserObject.roles.push({name:registerUser.roles})
    return this.http.post(AUTH_API + 'springjwt/signup', registerUserObject, httpOptionsforSignUp);
  }
}