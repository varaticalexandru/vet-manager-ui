import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { authInterceptor } from './commons/interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
    provideAnimationsAsync(),
    importProvidersFrom(
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
    )
  ]
};