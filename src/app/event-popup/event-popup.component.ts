import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.scss'
})
export class EventPopupComponent implements OnInit {
  constructor(private datePipe: DatePipe, private dialog: MatDialogRef<EventPopupComponent>, private http: ServiceService) { }
  data: any;
  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.http.showLoader();
    this.http.getEvent().subscribe({
      next: (res) => {
        for (let value of res) {
          value.date = this.formatDate(new Date(value.date));
          value.showCardBody = false;
        }
        this.data = res;
        console.log(this.data);
      }, error: (err) => { },
      complete: () => this.http.hideLoader()
    })
  }
  formatDate(date: Date): string {
    console.log(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  closePopup() {
    this.dialog.close();
  }
  toggleCardBody(item: any) {
    item.showCardBody = !item.showCardBody;
  }
}
