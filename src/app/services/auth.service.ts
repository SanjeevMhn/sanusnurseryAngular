import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, retry, switchMap, take, takeUntil } from "rxjs/operators";
import { BehaviorSubject, Observable, of, catchError, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { isObjectEmpty } from "../utils/functions/isObjectEmpty";
import { AuthInterceptor } from "../interceptors/auth.interceptor";
import { ToastService } from "./toast.service";
import { ToastType } from "../modules/shared/toast/toast.modal";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
  ) {}

  getUserData(): Observable<any> {
    return this.http.get(`${environment.authUrl}/me`).pipe(
      map((res: any) => res.user[0]),
      retry(2),
      catchError((err) => of(err)),
    );
  }

  isAdmin(): Observable<boolean> {
    return this.getUserData().pipe(
      map((user: any) => {
        if (user && user.user_role === "admin") {
          return true;
        } else {
          return false;
        }
      }),
    );
  }

  sendOrderRequest(orderData: any): Observable<object> {
    return this.http.post(environment.orderUrl, orderData, {
      withCredentials: true,
      observe: "response",
    });
  }

  login(data:any): Observable<any>{
    return this.http.post(environment.authUrl,data,{withCredentials: true}).pipe(switchMap((res: any) => of(res)));
  }

  logout(): Observable<any> {
    return this.http
      .post(`${environment.authUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        switchMap((res: any) => {
          AuthInterceptor.accessToken = "";
          this.toastService.show("User logged out", ToastType.success);
          // this.router.navigate([this.router.url]);
          window.location.reload();
          return of(res)
        }),
        catchError(err => of(err))
      );
  }
}
