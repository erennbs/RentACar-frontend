import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeWith, Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44321/api/Colors";

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = `${this.apiUrl}/getall`
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color: Color): Observable<SingleResponseModel<Color>> {
    let newPath = `${this.apiUrl}/add`;
    return this.httpClient.post<SingleResponseModel<Color>>(newPath, color);
  }
  
  updateColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl, color);
  }

  deleteColor(colorId: number): Observable<ResponseModel>{
    let newPath = `${this.apiUrl}?id=${colorId}`;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}
