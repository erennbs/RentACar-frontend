import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetails } from '../models/carDetails';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44321/api/Cars";
  validFilters: string[] = ["brand", "color", "startDate", "endDate"];

  constructor(private httpClient: HttpClient) { }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = `${this.apiUrl}/getbyid?id=${carId}`;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getDetailsById(carId: number): Observable<SingleResponseModel<CarDetails>> {
    let newPath = `${this.apiUrl}/getdetailsbyid?id=${carId}`
    return this.httpClient.get<SingleResponseModel<CarDetails>>(newPath);
  }

  getCars(): Observable<ListResponseModel<CarDetails>> {
    let newPath = `${this.apiUrl}/getalldetails`
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }

  getCarsFiltered(filters: { [key: string]: string}) : Observable<ListResponseModel<CarDetails>> {
    let newPath = `${this.apiUrl}/getalldetails?`;
    let queryParams: string[] = [];
    
    for (let filter in filters) {
      if (this.validFilters.includes(filter) && filters[filter]) {
        queryParams.push(`${filter}=${filters[filter]}`);
      }
    }

    newPath += queryParams.join("&");
    console.log(newPath)
    
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = `${this.apiUrl}/getbybrand?brandId=${brandId}`;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }
  
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetails>> {
    let newPath = `${this.apiUrl}/getbycolor?colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<CarDetails>>(newPath);
  }

  addCar(car: Car) : Observable<SingleResponseModel<Car>>{
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<SingleResponseModel<Car>>(newPath, car);
  }

  updateCar(car: Car) : Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl, car);
  }

  deleteCar(carId: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}?id=${carId}`;
    return this.httpClient.delete<ResponseModel>(newPath)
  }
}
