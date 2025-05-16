import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherConditionsComponent } from './weather-conditions/weather-conditions.component';
import { WeatherAPIService } from './services/weather-api.service';
import { Subscription } from 'rxjs';
import { WeatherForecast } from './app.interfaces';
import { GeolocationService } from './services/geolocation.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  imports: [
    FontAwesomeModule,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    WeatherConditionsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private WeatherService: WeatherAPIService,
    private GeoLocationService: GeolocationService
  ) {}
  faSpinner = faSpinner;
  sub?: Subscription;
  isLoading: boolean = true;
  weatherData?: WeatherForecast;
  bgVideoURL!: string;
  @ViewChild('bgVid') bgVid!: ElementRef<HTMLVideoElement>;
  bgVideo(): void {
    let conditionCode = this.weatherData?.current.condition;
    let dictionary = [
      {
        code: 1000,
        text: 'Sunny',
        img: 'sunny',
      },
      {
        code: 1003,
        text: 'Partly cloudy',
        img: 'partly_cloudy',
      },
      {
        code: 1006,
        text: 'Cloudy',
        img: 'cloudy',
      },
      {
        code: 1009,
        text: 'Overcast',
        img: 'overcast',
      },
      {
        code: 1030,
        text: 'Mist',
        img: 'mist',
      },
      {
        code: 1063,
        text: 'Patchy rain possible',
        img: 'light_rain',
      },
      {
        code: 1066,
        text: 'Patchy snow possible',
        img: 'light_snow',
      },
      {
        code: 1069,
        text: 'Patchy sleet possible',
        img: 'light_sleet',
      },
      {
        code: 1072,
        text: 'Patchy freezing drizzle possible',
        img: 'light_drizzle',
      },
      {
        code: 1087,
        text: 'Thundery outbreaks possible',
        img: 'thunder_outbreaks',
      },
      {
        code: 1114,
        text: 'Blowing snow',
        img: 'light_snow',
      },
      {
        code: 1117,
        text: 'Blizzard',
        img: 'blizzard',
      },
      {
        code: 1135,
        text: 'Fog',
        img: 'fog',
      },
      {
        code: 1147,
        text: 'Freezing fog',
        img: 'fog',
      },
      {
        code: 1150,
        text: 'Patchy light drizzle',
        img: 'light_drizzle',
      },
      {
        code: 1153,
        text: 'Light drizzle',
        img: 'light_drizzle',
      },
      {
        code: 1168,
        text: 'Freezing drizzle',
        img: 'drizzle',
      },
      {
        code: 1171,
        text: 'Heavy freezing drizzle',
        img: 'heavy_drizzle',
      },
      {
        code: 1180,
        text: 'Patchy light rain',
        img: 'light_rain',
      },
      {
        code: 1183,
        text: 'Light rain',
        img: 'light_rain',
      },
      {
        code: 1186,
        text: 'Moderate rain at times',
        img: 'moderate_rain',
      },
      {
        code: 1189,
        text: 'Moderate rain',
        img: 'moderate_rain',
      },
      {
        code: 1192,
        text: 'Heavy rain at times',
        img: 'heavy_rain',
      },
      {
        code: 1195,
        text: 'Heavy rain',
        img: 'heavy_rain',
      },
      {
        code: 1198,
        text: 'Light freezing rain',
        img: 'light_drizzle',
      },
      {
        code: 1201,
        text: 'Moderate or heavy freezing rain',
        img: 'moderate_rain',
      },
      {
        code: 1204,
        text: 'Light sleet',
        img: 'light_sleet',
      },
      {
        code: 1207,
        text: 'Moderate or heavy sleet',
        img: 'light_sleet',
      },
      {
        code: 1210,
        text: 'Patchy light snow',
        img: 'light_snow',
      },
      {
        code: 1213,
        text: 'Light snow',
        img: 'light_snow',
      },
      {
        code: 1216,
        text: 'Patchy moderate snow',
        img: 'moderate_snow',
      },
      {
        code: 1219,
        text: 'Moderate snow',
        img: 'moderate_snow',
      },
      {
        code: 1222,
        text: 'Patchy heavy snow',
        img: 'heavy_snow',
      },
      {
        code: 1225,
        text: 'Heavy snow',
        img: 'heavy_snow',
      },
      {
        code: 1237,
        text: 'Ice pellets',
        img: 'moderate_snow',
      },
      {
        code: 1240,
        text: 'Light rain shower',
        img: 'light_rain',
      },
      {
        code: 1243,
        text: 'Moderate or heavy rain shower',
        img: 'heavy_rain',
      },
      {
        code: 1246,
        text: 'Torrential rain shower',
        img: 'torrential_rain_shower',
      },
      {
        code: 1249,
        text: 'Light sleet showers',
        img: 'light_sleet',
      },
      {
        code: 1252,
        text: 'Moderate or heavy sleet showers',
        img: 'light_sleet',
      },
      {
        code: 1255,
        text: 'Light snow showers',
        img: 'light_snow',
      },
      {
        code: 1258,
        text: 'Moderate or heavy snow showers',
        img: 'heavy_snow',
      },
      {
        code: 1261,
        text: 'Light showers of ice pellets',
        img: 'moderate_snow',
      },
      {
        code: 1264,
        text: 'Moderate or heavy showers of ice pellets',
        img: 'heavy_snow',
      },
      {
        code: 1273,
        text: 'Patchy light rain with thunder',
        img: 'rain_thunder',
      },
      {
        code: 1276,
        text: 'Moderate or heavy rain with thunder',
        img: 'moderate_rain',
      },
      {
        code: 1279,
        text: 'Patchy light snow with thunder',
        img: 'rain_thunder',
      },
      {
        code: 1282,
        text: 'Moderate or heavy snow with thunder',
        img: 'heavy_snow',
      },
    ];
    let m = dictionary.find((e) => e.code === conditionCode?.code) || {
      img: 'sunny',
    };
    if (
      conditionCode?.code === 1000 &&
      this.weatherData?.current.is_day === 0
    ) {
      this.bgVideoURL = 'clear_night';
    }
    this.bgVideoURL = m.img;
  }
  async getUserLocation() {
    const currLoc = await this.GeoLocationService.getCoordinates();
    this.WeatherService.city.next(`${currLoc.lat},${currLoc.lon}`);
  }
  ngOnInit(): void {
    initFlowbite();
    this.sub = this.WeatherService.getWeather().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.isLoading = false;
        this.bgVideo();
        this.bgVid.nativeElement.load();
      },
      error: (e) => {
        console.log('never mind ' + e);
        this.isLoading = false;
      },
    });
    this.getUserLocation();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
