import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockmarketService } from 'src/app/services/stockmarket.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  companyForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private stockmarketapi : StockmarketService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.companyForm=this.formBuilder.group({
      companyName : ['',Validators.required],
      description : ['',Validators.required],
      ceo : ['',Validators.required],
      turnover : ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      website : ['',Validators.required],
      exchange : ['', Validators.required]

    })
  }

  addCompany(){
    if(this.companyForm.valid){
      this.stockmarketapi.add(this.companyForm.value)
      .subscribe({
        next:(res)=>{
          alert("Company Registered");
          this.companyForm.reset();
          this.dialogRef.close();
        },
        error:()=>{
          alert("Error occured while adding the Company")
        }

      })
    }

  }

}
