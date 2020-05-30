import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpClient,

} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`AddTokenInterceptor - ${req.url}`);

    console.log(req);

    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('userToken') || null}`,
      },
    });

    return next.handle(jsonReq);
  }
}
