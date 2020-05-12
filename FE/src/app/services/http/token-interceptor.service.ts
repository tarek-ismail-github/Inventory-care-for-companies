import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector: Injector) { }

  intercept(req, next) {
    const authService = this.injector.get(AuthenticationService);
    const token = authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          'Authorization':  `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
