import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginForm, RegisterForm],
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css'], // corrected from styleUrl to styleUrls
})
export class Authentication implements OnInit {
  // Reactive forms for login and registration
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  // Flag to toggle between login and register modes
  isLoginMode = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize both forms on component load
    this.initForms();
  }

  /**
   * Initialize reactive forms with validation rules
   */
  private initForms(): void {
    // Login form with required fields
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Registration form with multiple validations
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      },
      {
        validators: this.passwordMatchValidator, // Custom validator to check password match
      }
    );
  }

  /**
   * Custom validator to ensure password and confirmPassword match
   * @param form - The FormGroup containing password fields
   * @returns validation error object or null
   */
  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null
      : { mismatch: true };
  }

  /**
   * Toggle between login and registration modes
   */
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
}
