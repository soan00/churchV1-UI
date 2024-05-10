import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-popup',
  standalone: true,
  imports: [],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.scss'
})
export class EventPopupComponent {
  constructor(private dialog: MatDialogRef<EventPopupComponent>) { }
  closePopup() {
    this.dialog.close();
  }
}
