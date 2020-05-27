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

  apiUrl = 'http://localhost:3000';
  
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`);
  }
  getCompanyById(companyId: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/companies/${companyId}`);
  }
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl}/companies`, company);
  }
  getProdcutsByCompanyId(companyId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiUrl}/products?companyId=${companyId}`
    );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }
}
