import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string = "https://localhost:7204"
  constructor(private http: HttpClient, private loader: NgxSpinnerService) { }
  getNavbarData(): Observable<any> {
    return this.http.get<any>(`${this.url}/Home/getNavItems`);
  }
  getContents(): Observable<any> {
    return this.http.get<any>(`${this.url}/Home/getContent`)
  }
  showLoader() {
    this.loader.show()
  }
  hideLoader() {
    this.loader.hide();
  }
}
