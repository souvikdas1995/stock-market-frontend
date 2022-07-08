import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder : FormBuilder, @Inject(MAT_DIALOG_DATA) public signupData:any,
  private dialogRef : MatDialogRef<RegisterComponent>,
  private authService: AuthService) { }

  ngOnInit(): void {

    this.registerForm=this.formBuilder.group({
      name : ['',Validators.required],
      password : ['',Validators.required],
      roles : ['',Validators.required]
    })
  }
 
  register(): void {
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      
      this.authService.register(this.registerForm.value)
        .subscribe({
          next:(res)=>{
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            this.registerForm.reset();
            this.dialogRef.close('signup');
          },
          error:()=>{
            this.errorMessage = "Error while registering";
            this.isSignUpFailed = true;
          }

    })
  }
  }
}
