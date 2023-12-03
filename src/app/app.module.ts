import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { ErrorModule } from './error/error.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogRequestInterceptor } from './core/log-request.interceptor';
import { CreateTwimpModule } from './create-twimp/create-twimp.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    DashboardModule,
    LoginModule,
    ProfileModule,
    CreateTwimpModule,
    ErrorModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LogRequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
