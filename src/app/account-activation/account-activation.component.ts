import { AfterViewChecked, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { IAccountActivation } from '../../interfaces/iaccount-activation';
import { ILoginResponse } from '../../interfaces/i-login-response';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent implements OnInit{


  message: string = '';
  actRoute = inject(ActivatedRoute);
  auth = inject(AuthService);
  resp?: ILoginResponse;
  result: boolean = false;

  ngOnInit(): void {

    let email = this.actRoute.snapshot.paramMap.get("email");
    let code = this.actRoute.snapshot.paramMap.get("code");

    const loginUser: IAccountActivation = <IAccountActivation>{
      userEmail: email,
      activationCode: code
    };
    this.auth.activeAccount(loginUser).subscribe(
      (response: ILoginResponse) => {
        this.resp=response;
        this.result = true;
      },
      err => {
        this.resp=err;
        this.result = false;
      }
    );
  }

}
