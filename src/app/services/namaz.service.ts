import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NamazService {
  private baseUrl = 'https://api.aladhan.com/v1/timingsByCity/today';

  constructor(private http: HttpClient) {}

  getTimes(city: string, country: string): Observable<any> {
    const url = `${this.baseUrl}?city=${city}&country=${country}&method=3`;
    return this.http.get(url);
  }
}
