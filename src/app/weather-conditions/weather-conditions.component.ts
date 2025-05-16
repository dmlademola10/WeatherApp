import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faWater,
  faRainbow,
  faSun,
  faTemperature0,
  faCompass,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherAPIService } from '../services/weather-api.service';
import { Subscription } from 'rxjs';
import { WeatherForecast } from '../app.interfaces';

@Component({
  selector: 'app-weather-conditions',
  imports: [FontAwesomeModule],
  templateUrl: './weather-conditions.component.html',
  styleUrl: './weather-conditions.component.css',
})
export class WeatherConditionsComponent implements OnInit, OnDestroy {
  constructor(private WeatherService: WeatherAPIService) {}

  private sub?: Subscription;
  weatherData?: WeatherForecast;
  faSun = faSun;
  faWater = faWater;
  faTemperature0 = faTemperature0;
  faCompass = faCompass;
  faRainbow = faRainbow;
  faWind = faWind;
  ngOnInit(): void {
    this.sub = this.WeatherService.getWeather().subscribe((data) => {
      this.weatherData = data;
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
