import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    // Define the animation
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
  imports: [RouterOutlet, NavbarComponent, HomeComponent, FooterComponent, NgxSpinnerModule]
})
export class AppComponent {
  title = 'UI';
}
