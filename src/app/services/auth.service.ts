import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { RegisterModel } from '../models/registerModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { TokenPayloadModel } from '../models/tokenPayloadModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44321/api/Auth";
  private logedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = `${this.apiUrl}/login`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = `${this.apiUrl}/register`;
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel);
  }

  isAuthenticated(): boolean {
    if (this.localStorageService.get('token')) {
      let claims = this.getUserClaims();
            
      if (claims!.exp < Math.floor(Date.now() / 1000)) {
        this.localStorageService.delete('token');
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  getUserClaims() : TokenPayloadModel | undefined{
    if (this.localStorageService.get('token')) {
      let claims = jwtDecode<TokenPayloadModel>(this.localStorageService.get('token')!)
      return claims;
    }
    return 
  }

  setLogedIn(logedIn: boolean) {
    this.logedInSubject.next(logedIn);
  }

  getLogedInObservable() {
    return this.logedInSubject.asObservable();
  }
}
