import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterOutlet, CommonModule, FooterComponent]
})
export class HomeComponent implements OnInit {
  constructor(private http: ServiceService, private sanitizer: DomSanitizer) { }
  data: any;

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.http.showLoader();
    this.http.getContents().subscribe({
      next: (res) => {
        this.data = res;
        console.log(this.data);
      }, error: (err) => console.log(err),
      complete: () => this.http.hideLoader()
    })
  }
  getSafeUrl(link: string): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
}
