import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamazService } from '../services/namaz.service';
import { ApiResponse, ApiData, Timings } from '../../interfaces/prayertimes.interfaces';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
  data!: ApiData;
  timings!: Timings;

  private namazService = inject(NamazService);

  dateNow = new Date();

  dateToday = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(this.dateNow);

  getApiInformation() {
    this.namazService.getTimes("Roermond", "Netherlands")
    .subscribe({
      next: (res: ApiResponse) => {
        this.data = res.data;
        this.timings = res.data.timings;
        console.log(this.data)
      },
      error: (err) => {
        console.error('Error: ', err)
      } 
    })
  }

  ngOnInit() {
    this.getApiInformation();
  }
}
