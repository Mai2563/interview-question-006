import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  productCode: string;
  barcode?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private api = 'http://localhost:5292/api/ProductCodes'; // เปลี่ยนตาม backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  add(data: Product): Observable<Product> {
    return this.http.post<Product>(this.api, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}