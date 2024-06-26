import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string = "https://localhost:7204"
  constructor(private http: HttpClient, private loader: NgxSpinnerService) { }
  getNavbarData(): Observable<any> {
    return this.http.get<any>(`${this.url}/Home/getNavItems`);
  }
  getContents(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.url}/Home/getContent?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  getEvent(): Observable<any> {
    return this.http.get<any>(`${this.url}/Home/getEvent`);
  }
  postPrayer(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/Home/postPrayer`, data);
  }
  showLoader() {
    this.loader.show()
  }
  hideLoader() {
    this.loader.hide();
  }
}
