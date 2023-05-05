import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  constructor(private serverService: HttpService, private router: Router) {}

  canActivate() {
    return this.serverService.checkStatus().pipe(
      map(() => true),
      catchError(() => {
        this.router.navigateByUrl('/server-down');
        return of(false);
      })
    );
  }
}
