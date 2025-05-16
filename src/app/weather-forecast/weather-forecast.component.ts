import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { WeatherAPIService } from '../services/weather-api.service';
import { Subscription } from 'rxjs';
import { WeatherForecast } from '../app.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  constructor(private WeatherService: WeatherAPIService) {}
  sub?: Subscription;
  weatherData?: WeatherForecast;
  faSun = faSun;
  ngOnInit(): void {
    this.sub = this.WeatherService.getWeather().subscribe((data) => {
      this.weatherData = data;
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
