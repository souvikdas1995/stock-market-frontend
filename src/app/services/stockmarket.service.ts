import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Stock } from '../models/stock.model';
const companyBaseUrl = 'http://localhost:8081/api/v1/company';
const stockBaseUrl = 'http://localhost:8082/api/v1/stock';
@Injectable({
  providedIn: 'root'
})
export class StockmarketService {

  constructor(private http: HttpClient) {}
    getAll(): Observable<Company[]> {
      return this.http.get<Company[]>(`${companyBaseUrl}/getall`);
   }
   get(id: number): Observable<Company> {
    return this.http.get(`${companyBaseUrl}/info/${id}`);
  }
  add(company : any): Observable<any> {
    return this.http.post<any>(`${companyBaseUrl}/add`,company);
  }
  update(company : any, id: number): Observable<any>{
    return this.http.put<any>(`${companyBaseUrl}/`+id,company);
  }
  delete(id : number): Observable<any> {
    return this.http.delete(`${companyBaseUrl}/`+id);
  }

}
