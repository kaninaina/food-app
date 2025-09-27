import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { passwordRegexPattern } from '../../models/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
})
export class LoginForm implements OnInit {
  loginForm!: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.initForm();
    this.loginForm.valueChanges.subscribe(() => {
      this.loginForm.updateValueAndValidity({ onlySelf: false, emitEvent: false });
    });
  }

  // Initialize the reactive form with validators
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(passwordRegexPattern)]],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value);
      this.router.navigate(['menu']);
    } else {
      this.loginForm.markAllAsTouched(); // Show errors if invalid
    }
  }

  // Form controls getters for template access
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Validation error messages for email
  get emailError(): string {
    if (!this.email?.touched) return '';

    if (this.email?.hasError('required')) {
      return 'EMAIL_IS_REQUIRED';
    }
    if (this.email?.hasError('email')) {
      return 'EMAIL_VALID_ERROR';
    }
    return '';
  }

  // Validation error messages for password
  get passwordError(): string {
    if (!this?.password?.touched) return '';
    if (this.password.errors?.['required']) return 'PASSWORD_IS_REQUIRED';
    if (this.password.errors?.['minlength']) return 'PASSWORD_LENGTH_ERROR';
    if (this.password.errors?.['pattern']) return 'PASSWORD_PATTERN_ERROR';
    return '';
  }
}
