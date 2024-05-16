import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserReg } from '../../interfaces/i-user-reg';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb=inject(FormBuilder);
  authService=inject(AuthService);
  router = inject(Router);
  messages?: string[];


  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  onSubmit(){
    const newUser: IUserReg = <IUserReg>{
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    };
    console.log(newUser)

    this.authService.registerUser(newUser).subscribe((response: string) => {
      this.router.navigate(['login']);
    },
    err => {
      this.messages = err.error.messages;
    }
    );
  }
}
