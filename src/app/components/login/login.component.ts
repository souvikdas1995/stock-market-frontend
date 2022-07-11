import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { RegisterComponent } from '../registration/registration.component';
import {MatDialog} from '@angular/material/dialog';

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
  private dialogRef : MatDialogRef<LoginComponent>, @Inject(MatDialog) public  dialog: MatDialog,
  private authService: AuthService, private tokenStorage: TokenStorageService) { }

  
      

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      name : ['',Validators.required],
      password : ['',Validators.required]
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  openRegistrationDialog(){
    this.dialogRef.close();
    this.dialog.open(RegisterComponent,{
      width:'30%'
    }).afterClosed().subscribe(val =>{
     {
      this.dialog.open(LoginComponent,{
        width:'30%'
      })
      }
  })
  
    
  }

  login(): void {
    if(this.loginForm.valid){
    this.authService.login(this.loginForm.value)
    .subscribe({
      next:(data)=>{
          console.log(data.access_token);
          this.tokenStorage.saveToken(data.access_token);
          this.tokenStorage.saveUser(data.access_token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
      },
      error:()=>{
        this.errorMessage = "Error while registering";
        console.log("error");
        this.isLoginFailed = true;
      }
    })
  }
}

  reloadPage(): void {
    window.location.reload();
  }
}

