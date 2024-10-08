import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44321/api/Payments/";

  constructor(private httpClient: HttpClient) { }

  makePayment(payment: Payment) : Observable<ResponseModel>{
    let newPath = `${this.apiUrl}makepayment`;
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }
}
