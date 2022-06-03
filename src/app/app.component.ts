
import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { StockmarketService } from './services/stockmarket.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title ='stock market';
  searchForm !:FormGroup;
  companies: any =[];
  companyCode!: string;
  displayedColumns: string[] = ['companyName', 'description', 'ceo', 'turnover','website', 'exchange', 'action'];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog ,private stockmarketapi: StockmarketService, private formBuilder : FormBuilder) {}
  ngOnInit():void{
    
  
  this.stockmarketapi
  .getAll()
  .subscribe(response => this.companies = response);


    this.searchForm=this.formBuilder.group({
      companyName : ['',Validators.required],
      startDate : ['',Validators.required],
      endDate : ['',Validators.required]

    })
    this.getallcompanyDetails();
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val =>{
        if(val==='save'){
          this.getallcompanyDetails();
        }
    })
  }
  getallcompanyDetails(){
    this.stockmarketapi.getAll()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("error occured while showing company details");
      }
    })

  }

  editCompany(row : any){

    this.dialog.open(DialogComponent,{
      width:'30%',
      data : row

    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getallcompanyDetails();
      }
  })
  }

  deleteCompany(id : number){
    this.stockmarketapi.delete(id)
    .subscribe({
      next:(res)=>{
        alert("deleted successfully");
        this.getallcompanyDetails();
      },
      error:(err)=>{
        alert("error occured while deleting company");
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}