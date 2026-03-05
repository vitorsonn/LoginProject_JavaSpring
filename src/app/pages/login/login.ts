import { Component, inject } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [DefaultLoginLayout, ReactiveFormsModule, PrimaryInput],
  providers: [
    LoginService
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  submit(){
    this.loginService.login(this.loginForm.value.email , this.loginForm.value.password).subscribe()
    next: () => this.toastr.success("Deu certo")
    error: () => this.toastr.error("Deu errado")
  }


  navigate(){
    this.router.navigate(["/signup"])
  }
}
