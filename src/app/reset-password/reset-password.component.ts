import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  actRoute = inject(ActivatedRoute);

  authService = inject(AuthService);
  fb=inject(FormBuilder);
  form = this.fb.nonNullable.group({
    email: ['', Validators.required]
  });

  changePasswordForm = this.fb.nonNullable.group({
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  });

  emailPath: any;
  codePath: any;
  emailForm: boolean=true;

  response?: any;
  err: boolean=false;

  confirmPasswordResponse?: any;
  confirmPasswordErr: boolean = false;
  confirmPasswordErrorMessage?: string;

  ngOnInit(): void {
    this.emailPath = this.actRoute.snapshot.firstChild?.paramMap.get("email");
    this.codePath = this.actRoute.snapshot.firstChild?.paramMap.get("code");

    if(this.emailPath == null && this.codePath == null) {
      this.emailForm = true;
    } else {
      this.emailForm = false;
    }
  }

  onSubmit() {
    this.authService.resetPasswordEmail(this.form.value.email!).subscribe((res) => {
      this.response = res;
      this.err = false;
    },
    () => {
      this.err=true;
    });
  }

  onSubmitChangePassword() {
    let password = this.changePasswordForm.value.password;
    let passwordConfirm = this.changePasswordForm.value.passwordConfirm;
    console.log(this.changePasswordForm.value.password)
    this.authService.resetPassword(this.emailPath, this.codePath, password!, passwordConfirm!).subscribe((res) => {
      console.log(res);
      this.confirmPasswordResponse = res;
      this.confirmPasswordErr = false;
    },
    (err) => {
      console.log(err);
      this.confirmPasswordErrorMessage = err.error;
      this.confirmPasswordErr = true;
    }
    )
  }

}
