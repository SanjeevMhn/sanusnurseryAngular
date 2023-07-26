import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isObjectEmpty } from '../utils/functions/isObjectEmpty';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDataSubject = new BehaviorSubject<object>({});
  userData = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserData(): Observable<object> {
    return this.http.get(`${environment.authUrl}/me`);
  }

  setUserData(data: object) {
    this.userDataSubject.next(data);
  }

  removeUserData() {
    const emptyUserData = new BehaviorSubject<object>({});
    this.userDataSubject.next(emptyUserData.getValue());
  }

  isAdmin(): Observable<boolean>{
    return this.userData.pipe(
      map((data:any) => {
        if( !isObjectEmpty(data) && data.user_role === 'admin'){
           return true;
        }
        else{
          return false;
        }
      })

    )
  }

  sendOrderRequest(orderData:any):Observable<object>{
    return this.http.post(environment.orderUrl,orderData,{withCredentials: true, observe:'response'});
  }

  logout(): Observable<object> {
    return this.http.post(`${environment.authUrl}/logout`, {}, { withCredentials: true });
  }

}
