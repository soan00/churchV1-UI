import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize } from 'rxjs';


export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show(); // Show spinner when the request starts

    return next.handle(req).pipe(
      // Hide spinner when the response is received or when an error occurs
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
