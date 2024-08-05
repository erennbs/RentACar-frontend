import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Image } from '../models/image';
import { ResponseModel } from '../models/responseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  apiUrl = "https://localhost:44321/api/CarImages";

  constructor(private httpClient: HttpClient) { }

  getImagesByCarId(carId: number): Observable<ListResponseModel<Image>> {
    let newPath = `${this.apiUrl}/getbycarid?carId=${carId}`;
    return this.httpClient.get<ListResponseModel<Image>>(newPath)
  }

  addImage(carId: number, file: File) : Observable<ResponseModel>{
    let newPath = `${this.apiUrl}/upload`;
    const formData = new FormData();
    formData.append('File', file);
    formData.append('CarId', carId.toString());
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  deleteImage(imageId: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}?id=${imageId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }

  deleteByCarId(carId: number): Observable<ResponseModel> {
    let newPath = `${this.apiUrl}/deletebycarid?carId=${carId}`;
    return this.httpClient.delete<ResponseModel>(newPath)
  }
}
