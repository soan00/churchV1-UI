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
  constructor(private http: ServiceService, private sanitizer: DomSanitizer, private dialog: MatDialog) { }
  data: any;

  ngOnInit(): void {
    this.loadData();
    this.openPopup();
  }
  loadData() {
    this.http.showLoader();
    this.http.getContents().subscribe({
      next: (res) => {
        this.data = res;    
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
    })

  }
}
