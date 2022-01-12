import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common"
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { AppRoutingModule } from './app-routing.module';

/* root component, exported from app.component.ts which is inicialized in index.html*/
import { AppComponent } from './app.component';

/* reusable, not navigable componenets*/
import { CometaHeaderComponent } from './components/cometa-header/cometa-header.component';
import { CometaDevicesComponent } from './components/cometa-devices/cometa-devices.component';
import { CometaFeaturesComponent } from './components/cometa-features/cometa-features.component';
import { CometaPortfolioComponent } from './components/cometa-portfolio/cometa-portfolio.component';
import { CometaArchitectureComponent } from './components/cometa-architecture/cometa-architecture.component';
import { CometaEnterpriseComponent } from './components/cometa-enterprise/cometa-enterprise.component';
import { CometaContactUsComponent } from './components/cometa-contact-us/cometa-contact-us.component';
import { CometaUsersComponent } from './components/cometa-users/cometa-users.component';
import { CometaFooterComponent } from './components/cometa-footer/cometa-footer.component';

/* page components, these components are navigable */
import { CometaHomeComponent } from './components/cometa-home/cometa-home.component';
import { CometaLogotipsComponent } from './components/cometa-logotips/cometa-logotips.component';
import { CometaSpeechComponent } from './components/cometa-speech/cometa-speech.component';

/* BrowserAnimationsModule is necessary if angular material is used, material includes certain animations*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CometaHomeComponent,
    CometaHeaderComponent,
    CometaDevicesComponent,
    CometaFeaturesComponent,
    CometaPortfolioComponent,
    CometaArchitectureComponent,
    CometaEnterpriseComponent,
    CometaContactUsComponent,
    CometaUsersComponent,
    CometaFooterComponent,
    CometaLogotipsComponent,
    CometaSpeechComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    BotDetectCaptchaModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
