import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginForm, RegisterForm, TranslatePipe],
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css'], // corrected from styleUrl to styleUrls
})
export class Authentication {
  /**
   * Flag to control whether login form or register form is displayed.
   * true -> show login form
   * false -> show register form
   */
  isLoginMode = true;

  /**
   * Toggles between login and register forms
   */
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }
}
