import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  logout(): Observable<object> {
    return this.http.post(`${environment.authUrl}/logout`, {}, { withCredentials: true });
  }

}
