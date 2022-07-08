import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/register-user.model';
import { Roles } from '../models/roles.model';
import { LoginUser } from '../models/login-user.model';

const AUTH_API = 'http://localhost:8083/authenticate/';

const httpOptionsforSignUp = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsforLogIn = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('testjwtclientid:XY7kmzoNzl100'),
      'Content-type': 'application/x-www-form-urlencoded'
      })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  constructor(
    private handler: HttpBackend) 
    {
    this.http = new HttpClient(handler);
    }

  login(loginUser: any): Observable<any> {

    console.log(httpOptionsforLogIn);
    let loginUserObject = {} as LoginUser;
    loginUserObject.username=loginUser.name;
    loginUserObject.password=loginUser.password;
    loginUserObject.grant_type ="password";
    const body = new HttpParams()
        .set('username', loginUser.name)
        .set('password', loginUser.password)
        .set('grant_type', 'password');


    return this.http.post(AUTH_API + 'oauth/token', body, httpOptionsforLogIn);
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