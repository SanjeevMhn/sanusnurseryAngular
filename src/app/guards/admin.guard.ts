import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isObjectEmpty } from '../utils/functions/isObjectEmpty';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  isAdmin?: boolean;

  constructor( private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.isAdmin().subscribe((data: boolean) => {
        this.isAdmin = data;
      })

      
      if(this.isAdmin){
        debugger;
        return true;
      }else{
        return this.router.navigate(['/home']);
      }

  }
  
}
