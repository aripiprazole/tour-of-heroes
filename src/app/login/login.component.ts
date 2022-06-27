import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX: RegExp =
  /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public constructor(private readonly formBuilder: FormBuilder) {}

  public loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    password: [null, [Validators.required]],
  });

  public ngOnInit(): void {}

  public onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }
}
