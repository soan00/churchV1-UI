import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private http: ServiceService) { }
  data: any;
  length: number = 0;
  ngOnInit(): void {
    this.http.showLoader();
    this.http.getNavbarData().subscribe({
      next: (res) => {
        this.data = res; this.http.hideLoader();
        this.length = this.data.length;
      },
      error: (err) => console.log(err),
      complete: () => this.http.hideLoader()
    }
    )
  }

}
