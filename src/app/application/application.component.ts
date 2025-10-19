import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamazService } from '../services/namaz.service';
import { TimeAndDateComponent } from './time-and-date/time-and-date.component';
import { ApiResponse, ApiData, Timings } from '../../interfaces/prayertimes.interfaces';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule, TimeAndDateComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
  data!: ApiData;
  timings!: Timings;
  timeLeft!: string;

  private namazService = inject(NamazService);

  getApiInformation() {
    this.namazService.getTimes("Roermond", "Netherlands")
    .subscribe({
      next: (res: ApiResponse) => {
        this.data = res.data;
        this.timings = res.data.timings;
        console.log(this.data);
        this.prayerTimeCountdown();
      },
      error: (err) => {
        console.error('Error: ', err)
      } 
    })
  }

  prayerOrder: Array<keyof Timings> = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];

  prayerTimeCountdown() {
    const dateNow = new Date()

    for (let prayer of this.prayerOrder) {
      const [h, m] = this.data.timings[prayer].split(':').map(Number);
      const prayerTime = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), h, m);

      if (prayerTime.getTime() > dateNow.getTime()) {
        const diff = prayerTime.getTime() - dateNow.getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const prayerTimeLeft = `${hours} : ${minutes} : ${seconds}`

        this.timeLeft = prayerTimeLeft;
        console.log(this.timeLeft)
        return;
      }
    }

    const [h, m] = this.data.timings.Fajr.split(':').map(Number);
    const fajrTommorow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() +1, h, m);
    const diff = fajrTommorow.getTime() - dateNow.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const fajrTimeLeft = `${hours} : ${minutes} : ${seconds}`

    this.timeLeft = fajrTimeLeft;
  }

  ngOnInit() {
    this.getApiInformation();

    setInterval(() => {
      this.prayerTimeCountdown();
    }, 1000);
  }
}
