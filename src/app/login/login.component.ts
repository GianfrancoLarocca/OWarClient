import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserReg } from '../../interfaces/i-user-reg';
import { Router } from '@angular/router';
import { ILoginResponse } from '../../interfaces/i-login-response';
import { IUserLogin } from '../../interfaces/i-user-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb=inject(FormBuilder);
  authService=inject(AuthService);
  router = inject(Router);

  loginError: boolean = false;


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    expTime: ['', Validators.required],
  });


  onSubmit(){

    let exp = '';
    if(this.form.value.expTime) {
      exp = 'week';
      console.log(exp)
    } else {
      exp = 'day'
      console.log(exp)
    }

    const loginUser: IUserLogin = <IUserLogin>{
      username: this.form.value.username,
      password: this.form.value.password,
      expTime: exp
    };
    this.authService.loginUser(loginUser).subscribe((response: ILoginResponse) => {
      this.loginError = false;;
      localStorage.setItem('auth', JSON.stringify(response));
      this.router.navigate(['home'])
    },
     () => {
      this.loginError = true;
    }
    );
  }

  resetDati(){
    this.router.navigate(["/reset"]);
  }

  registrati() {
    this.router.navigate(['/register']);
  }

}
