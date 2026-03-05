import { Component, inject } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { ToastrService } from 'ngx-toastr';
interface signupForm{
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}


@Component({
  selector: 'app-login',
  imports: [DefaultLoginLayout, ReactiveFormsModule, PrimaryInput],
  providers: [
    LoginService
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup<signupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {

    this.signupForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
      }),

      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
       passwordConfirm: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  submit(){
    this.loginService.login(this.signupForm.value.email , this.signupForm.value.password).subscribe()
    next: () => this.toastr.success("Deu certo")
    error: () => this.toastr.error("Deu errado")
  }


  navigate(){
    this.router.navigate(["/login"])
  }
}
