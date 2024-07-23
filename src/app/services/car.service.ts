import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44321/api/";

  constructor(private httpClient: HttpClient) { }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = `${this.apiUrl}Cars/getdetailsbyid?id=${carId}`
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = `${this.apiUrl}Cars/getalldetails`
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = `${this.apiUrl}Cars/getbybrand?brandId=${brandId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = `${this.apiUrl}Cars/getbycolor?colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
