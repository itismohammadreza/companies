import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:3000/companies');
  }
  addCompany(company: Company): Observable<Company[]> {
    return this.http.post<Company[]>(
      'http://localhost:3000/companies',
      company
    );
  }
  getProdcutsByCompanyId(companyId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      'http://localhost:3000/products?companyId=' + companyId
    );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }
}
