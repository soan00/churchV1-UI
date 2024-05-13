import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prayer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './prayer.component.html',
  styleUrl: './prayer.component.scss'
})
export class PrayerComponent implements OnInit {
  form: FormGroup | any;
  constructor(private fb: FormBuilder, private http: ServiceService, private tost: ToastrService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Request: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNo: ['', Validators.required, Validators.pattern('[0-9]*')]
    });
  }

  onSubmit() {
    this.http.showLoader();
    this.http.postPrayer(this.form.value).subscribe({
      next: (res) => { this.tost.success(res.message); this.form.reset(); }, error: (err) => { this.http.hideLoader(); console.log(err); this.tost.error("Something went wrong") }
      , complete: () => { this.http.hideLoader() }
    })

  }
}
