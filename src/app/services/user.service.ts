import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDto } from '../models/userDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:44321/api/Users";

  constructor(private httpClient: HttpClient) { }

  getById(id: number) : Observable<SingleResponseModel<UserDto>>{
    let newPath = `${this.apiUrl}/getbyid?id=${id}`;
    return this.httpClient.get<SingleResponseModel<UserDto>>(newPath);
  }

  editUser (user: UserDto) : Observable<SingleResponseModel<UserDto>> {
    return this.httpClient.put<SingleResponseModel<UserDto>>(this.apiUrl, user);
  }
}
