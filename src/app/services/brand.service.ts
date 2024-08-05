import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44321/api/Brands";

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = `${this.apiUrl}/getall`;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand: Brand): Observable<SingleResponseModel<Brand>> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath, brand);
  }
  
  updateBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl, brand);
  }

  deleteBrand(brandId: number): Observable<ResponseModel>{
    let newPath = `${this.apiUrl}?id=${brandId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
