import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { EventPopupComponent } from '../event-popup/event-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterOutlet, CommonModule, FooterComponent, EventPopupComponent]
})
export class HomeComponent implements OnInit {
  constructor(private http: ServiceService,
    private sanitizer: DomSanitizer, private dialog: MatDialog) { }
  data: any;
  pageSize: number = 3;
  pageNumber: number = 1;
  totalCount: number = 0;
  right: boolean = false;
  left: boolean = true;
  ngOnInit(): void {
    this.loadData(this.pageNumber, this.pageSize);
    this.openPopup();

  }
  loadData(pageNumber: number, pageSize: number) {
    this.http.showLoader();
    this.http.getContents(pageNumber, pageSize).subscribe({
      next: (res) => {
        this.data = res.Data;
        this.totalCount = res.Count;
        if ((this.pageNumber * this.pageSize) >= this.totalCount)
          this.right = true;
        console.log(this.data, this.totalCount);
      }, error: (err) => { this.http.hideLoader(); console.log(err) },
      complete: () => this.http.hideLoader()
    })
  }
  getSafeUrl(link: string): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  openPopup() {
    this.http.showLoader();
    this.http.getEvent().subscribe({
      next: (res) => {
        if (res.length > 0)
          this.dialog.open(EventPopupComponent, {
            width: '60%',
          });
      }, error: (err) => { this.http.hideLoader(); console.log(err); }, complete: () => this.http.hideLoader()
    });
  }
  sub() {
    this.pageNumber -= 1;
    this.loadData(this.pageNumber, this.pageSize);
    if (this.pageNumber == 1) {
      this.left = true;
      this.right = false;
    }
    else {
      this.pageNumber -= 1;
      this.right = false;
    }

  }
  add() {
    if (this.data.length === 0) return;
    this.pageNumber += 1;
    this.loadData(this.pageNumber, this.pageSize);
    this.left = false;
    const totalData = (this.pageNumber * this.pageSize) >= this.totalCount;
    if (totalData && this.data.length > 0) {
      this.right = true;
    }
    else {
      this.right = false;
    }


  }
}
