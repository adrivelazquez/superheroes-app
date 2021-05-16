import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SnackbarService } from '../services/snackbar.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService,
    private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();
    return next.handle(request).pipe(
      catchError((resp: HttpErrorResponse) => {
        const errorMsg = (resp.error instanceof ErrorEvent) ? `Error: ${resp.error.message}` : `Error Code: ${resp.status},  Message: ${resp.message}`;
        this.snackbarService.showSnackBar(resp.message, 'Error', 'error', 5000);
        return throwError(errorMsg);
      })
    ).pipe(
      finalize(() => {
        this.loadingService.hide();
      })
    )
  }
}
