import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherAPIService } from '../services/weather-api.service';
import { SearchResult, WeatherForecast } from '../app.interfaces';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faLocation } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-current-weather',
  imports: [FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css',
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  constructor(
    private WeatherService: WeatherAPIService,
    private GeoLocationService: GeolocationService
  ) {}
  faSearch = faSearch;
  faLocation = faLocation;
  searchString?: string;
  searchResults: SearchResult[] = [];
  sub?: Subscription;
  weatherData!: WeatherForecast;

  changeLoc(url: string) {
    if (this.WeatherService.city.getValue() !== url)
      this.WeatherService.city.next(url);
  }
  search() {
    if (this.searchString && this.searchString.length >= 3) {
      this.WeatherService.searchLocation(this.searchString).subscribe(
        (res: SearchResult[]) => {
          this.searchResults = [...res];
        }
      );
    } else {
      this.searchResults = [];
    }
  }
  async getUserLocation() {
    const currLoc = await this.GeoLocationService.getCoordinates();
    this.WeatherService.city.next(`${currLoc.lat},${currLoc.lon}`);
  }
  ngOnInit(): void {
    this.sub = this.WeatherService.getWeather().subscribe((data) => {
      this.weatherData = data;
      console.log(data);
      console.log('data');
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
