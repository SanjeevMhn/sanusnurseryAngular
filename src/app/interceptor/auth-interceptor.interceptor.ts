import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, pipe, catchError, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  refresh:boolean = false;

  constructor(private authService: AuthService, private http:HttpClient, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const req = request.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401 && !this.refresh){
        this.refresh = true;
       
        const options = {
          withCredentials: true
        };
        return this.http.post(environment.refreshToken,options).pipe(
          switchMap((res: any) => {
            console.log(res);
            this.authService.setAccessToken(res.accessToken);
            console.log(this.authService.getAccessToken());
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.authService.getAccessToken()}`
              }
            }));
          })
        )
      }
      this.refresh = false;
      return throwError(() => err)
    }));
  }
}