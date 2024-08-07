import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from '../services/auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { BaseComponent } from './base/base.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PlayerComponent } from './player/player.component';
import '@angular/common/locales/global/it';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegistroAttivitaComponent } from './registro-attivita/registro-attivita.component';
import { KeysPipe } from '../pipes/keys.pipe';
import { DataItalianaPipe } from '../pipes/data-italiana.pipe';
import { ClassificaComponent } from './classifica/classifica.component';
import { FriendsComponent } from './friends/friends.component';
import { SearchPlayerComponent } from './search-player/search-player.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationComponent } from './notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { StruttureComponent } from './strutture/strutture.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { ArsenaleComponent } from './arsenale/arsenale.component';
import { DifesaComponent } from './difesa/difesa.component';
import { EsercitoComponent } from './esercito/esercito.component';
import { TimeFormatPipe } from '../pipes/time-format.pipe';
import moment from 'moment';
import { ErrorMessageComponent } from './error-message/error-message.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountActivationComponent,
    BaseComponent,
    ResetPasswordComponent,
    PlayerComponent,
    RegistroAttivitaComponent,
    KeysPipe,
    DataItalianaPipe,
    ClassificaComponent,
    FriendsComponent,
    SearchPlayerComponent,
    NotificationComponent,
    FriendRequestsComponent,
    StruttureComponent,
    TecnologiaComponent,
    ArsenaleComponent,
    DifesaComponent,
    EsercitoComponent,
    TimeFormatPipe,
    ErrorMessageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
