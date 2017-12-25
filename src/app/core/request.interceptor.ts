import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as appConstants from './app-constants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    
    if (req.method === 'POST' || req.method === 'GET') {
      const clone = req.clone({
        params: req.params
        .append('token', appConstants.TOKEN)
        .append('site_id', appConstants.SITE_ID)
      });
      return next.handle(clone);
    }
  }
}


