import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  apiUrl = "https://localhost:44321/api/CarImages/";

  constructor(private httpClient: HttpClient) { }

  getImagesByCarId(carId: number): Observable<ListResponseModel<Image>> {
    let newPath = `${this.apiUrl}getbycarid?carId=${carId}`;
    return this.httpClient.get<ListResponseModel<Image>>(newPath)
  }
}
