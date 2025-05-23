import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherConditionsComponent } from './weather-conditions.component';

describe('WeatherConditionsComponent', () => {
  let component: WeatherConditionsComponent;
  let fixture: ComponentFixture<WeatherConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
