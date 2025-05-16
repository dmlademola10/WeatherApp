import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { SearchResult, WeatherForecast } from '../app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService {
  constructor(private http: HttpClient) {}
  private readonly apiKey: string = 'a7f6fb1f3ae7436ba78103426251105';
  private readonly baseURL: string = 'https://api.weatherapi.com/v1';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  city: BehaviorSubject<string> = new BehaviorSubject<string>('mecca');

  searchLocation(prfix: string): Observable<SearchResult[]> {
    return this.http
      .get<SearchResult[]>(
        `${this.baseURL}/search.json?key=${this.apiKey}&q=${prfix}&aqi=yes&days=14`,
        { headers: this.headers }
      )
      .pipe(switchMap((data) => of(data)));
  }

  getWeather(): Observable<WeatherForecast> {
    return this.city.pipe(
      switchMap((cityName: string) =>
        this.http.get<WeatherForecast>(
          `${this.baseURL}/forecast.json?key=${this.apiKey}&q=${cityName}&aqi=yes&days=14`,
          { headers: this.headers }
        )
      ),
      catchError((error: any) => {
        console.log('Error:', error);
        let errorMsg = 'An unknown error occurred!';
        if (error.status === 0) {
          errorMsg = 'No internet connection!';
        } else if (error.status === 404) {
          errorMsg = 'City not found!';
        } else if (error.status >= 500) {
          errorMsg = 'Server error!';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  // getWeather(): Observable<WeatherForecast> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   } );

  //   return this.http
  //     .get<WeatherForecast>(
  //       `https://${this.baseURL}/forecast.json?key=${this.apiKey}&q=${this.city}&aqi=yes&days=14`,
  //       { headers: headers }
  //     )
  //     .pipe(
  //       catchError((error) => {
  //         console.log(error);
  //         let errorMsg = 'An unknown error occurred!';
  //         if (error.status === 0) {
  //           errorMsg = 'No internet connection!';
  //         } else if (error.status === 404) {
  //           errorMsg = 'City not found';
  //         } else if (error.status >= 500) {
  //           errorMsg = 'Server error!';
  //         }
  //         return throwError(() => new Error(errorMsg));
  //       })
  //     );
  // }
}
