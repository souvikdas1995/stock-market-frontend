import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder : FormBuilder, @Inject(MAT_DIALOG_DATA) public loginData:any,
  private dialogRef : MatDialogRef<LoginComponent>,
  private authService: AuthService, private tokenStorage: TokenStorageService) { }

  
      

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      name : ['',Validators.required],
      password : ['',Validators.required]
    })
    this.loginForm.controls['name'].setValue(this.loginData.name);
    this.loginForm.controls['password'].setValue(this.loginData.password);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login(): void {
    if(!this.isLoggedIn){
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}

  reloadPage(): void {
    window.location.reload();
  }
}

