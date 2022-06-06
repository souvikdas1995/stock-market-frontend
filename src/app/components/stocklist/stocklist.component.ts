import { Component, OnInit, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from 'src/app/models/stock.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StocklistComponent implements OnInit {

  dataSource = this.stocklistData;
  columnsToDisplay = ['stockName', 'price', 'createdOn'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement !: Stock | null;
  avg !: number;
  min !: number;
  max !: number;

  constructor( @Inject(MAT_DIALOG_DATA) public stocklistData : any) { }

  ngOnInit(): void {
      console.log( this.stocklistData);
      var sum = 0;
      this.max = 0;
      this.min =0;
      this.avg =0;
      for (var i = 0; i < this.stocklistData.length; i++) {
        this.min = this.stocklistData[0].price;

        sum += this.stocklistData[i].price;

        if(this.max<this.stocklistData[i].price)
        this.max=this.stocklistData[i].price;

          if(this.min>this.stocklistData[i].price)
          this.min=this.stocklistData[i].price;
        
      }
      if(this.stocklistData.length >0)
      this.avg = sum / this.stocklistData.length;

      console.log("average " + this.avg);
      console.log("max "+this.max);
      console.log("min "+ this.min);


      
  }
}
