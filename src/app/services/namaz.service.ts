import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/prayertimes.interfaces';

@Injectable({ providedIn: 'root' })
export class NamazService {
  private baseUrl = 'https://api.aladhan.com/v1/timingsByCity/today';

  private http = inject(HttpClient);

  getTimes(city: string, country: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}?city=${city}&country=${country}`);
  }
}
