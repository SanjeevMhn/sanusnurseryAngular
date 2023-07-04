import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken:string = '';
  refresh:boolean = false;
  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status === 401 && !this.refresh){
        this.refresh = true;
        return this.http.post(environment.refreshToken,{},{withCredentials: true}).pipe(
          switchMap((res: any) => {
            AuthInterceptor.accessToken = res.accessToken;
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`
              }
            }))
          })
        )
      }
      this.refresh = false;
      return throwError(() => err);
    }));
  }
}