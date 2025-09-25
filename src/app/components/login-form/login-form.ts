import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.initForms();
  }

  private initForms() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.router.navigate(['menu']);
    }
  }
  get userName() {
    return this.loginForm.get('userName');
  }

  get userNameError() {
    if (this.userName?.dirty) {
      if (this.userName?.errors?.['email']) {
        return 'Enter valid email.';
      }
      if (this.userName?.errors?.['email']) {
        return 'Email is required.';
      }
    }
    return '';
  }
}
