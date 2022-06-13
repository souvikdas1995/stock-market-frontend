import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
const commandServiceUrl = 'http://localhost:8082/api/v1/';
const queryServiceUrl = 'http://localhost:8081/api/v1/';
@Injectable({
  providedIn: 'root'
})
export class StockmarketService {

  constructor(private http: HttpClient) {}
    getAll(): Observable<Company[]> {
      return this.http.get<Company[]>(`${queryServiceUrl}/company/getall`);
   }
   get(id: number): Observable<Company> {
    return this.http.get(`${queryServiceUrl}/company/info/${id}`);
  }
  add(company : any): Observable<any> {
    return this.http.post<any>(`${commandServiceUrl}/company/add`,company);
  }
  update(company : any, id: number): Observable<any>{
    return this.http.put<any>(`${commandServiceUrl}/company/`+id,company);
  }
  delete(id : number): Observable<any> {
    return this.http.delete(`${commandServiceUrl}/company/`+id);
  }
  getStocks(id : number, startDate : any, endDate : any) :  Observable<any>{
    return this.http.get(`${queryServiceUrl}/stock/get/`+id+'/'+startDate+'/'+endDate);
  }

}
