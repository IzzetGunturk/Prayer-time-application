export interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface ApiData {
  timings: Timings;
  date: string;
  city: string;
}

export interface ApiResponse {
  data: ApiData;
}
