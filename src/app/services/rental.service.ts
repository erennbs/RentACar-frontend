import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { RentalDetails } from '../models/rentalDetails';
import { Payment } from '../models/payment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44321/api/Rentals";

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalDetails>> {
    let newPath = `${this.apiUrl}/getalldetails`;
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
  }

  addRental(rental: Rental): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  deleteRental(id: number) : Observable<ResponseModel> {
    let newPath = `${this.apiUrl}?id=${id}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
