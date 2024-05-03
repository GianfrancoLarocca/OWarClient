import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../services/auth/auth.guard';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { BaseComponent } from './base/base.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PlayerComponent } from './player/player.component';
import { RegistroAttivitaComponent } from './registro-attivita/registro-attivita.component';

const routes: Routes = [

  {
    path: '',
    component: BaseComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'home' }
      },
      {
        path: 'player',
        component: PlayerComponent,
        data: { title: 'player' }
      },
      {
        path: 'registro-attivita',
        component: RegistroAttivitaComponent,
        data: { title: 'registro' }
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'register' }
  },
  {
    path: 'activation/:email/:code',
    component: AccountActivationComponent,
    data: { title: 'activation' }
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    data: { title: 'reset-password-email' },
    children: [
      {
        path: 'password/:email/:code',
        component: ResetPasswordComponent,
        data: { title: 'reset-password' }
      },
    ]
  },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
