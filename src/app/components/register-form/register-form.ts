import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { passwordRegexPattern } from '../../models/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.css'],
})
export class RegisterForm {
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(passwordRegexPattern),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );
  private router: Router = inject(Router);

  /** Custom validator to check if password and confirmPassword match */
  private passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (!confirmPassword) return null;

    return password === confirmPassword ? null : { mismatch: true };
  }

  /** Handle form submission */
  onRegister(): void {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
      this.router.navigate(['menu']);
    } else {
      this.registerForm.markAllAsTouched(); // show validation errors
    }
  }

  /** Validation error messages */
  get nameError(): string {
    const name = this.registerForm.get('name');
    if (!name?.touched) return '';
    if (name?.hasError('required')) return 'Name is required.';
    return '';
  }

  get emailError(): string {
    const email = this.registerForm.get('email');
    if (!email?.touched) return '';
    if (email?.hasError('required')) return 'EMAIL_IS_REQUIRED';
    if (email?.hasError('email')) return 'EMAIL_VALID_ERROR';
    return '';
  }

  get passwordError() {
    console.log('called');
    const password = this.registerForm.get('password');
    if (!password?.touched) return '';
    if (password.errors?.['required']) return 'PASSWORD_IS_REQUIRED';
    if (password.errors?.['pattern']) return 'PASSWORD_PATTERN_ERROR';
    return '';
  }
  get confirmPasswordError(): string {
    const confirmPassword = this.registerForm.get('confirmPassword');
    if (!confirmPassword?.touched) return '';
    if (confirmPassword?.hasError('required')) return 'CONFIRM_PASSWORD_REQUIRED';
    if (this.registerForm.hasError('mismatch')) return 'PASSWORD_MATCH_ERROR';
    return '';
  }
}
