import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken:string = '';
  constructor(private http: HttpClient) { }

  public setAccessToken(token: string):void{
    this.accessToken = token;
  }

  public getAccessToken():string{
    return this.accessToken;
  }

  login(params: any):Observable<object>{
    return this.http.post(environment.authUrl,params,{withCredentials: true});
  }

  getAuthData(): Observable<object>{
    return this.http.get(`${environment.authUrl}/me`);
  }

}
