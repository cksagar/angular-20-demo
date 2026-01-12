import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;

    const result = this.authService.login(email!, password!);
    if (result) {
      console.log('Login successful');
      this.router.navigate(['/posts']);
      this.toast.success('Login successful!');
    } else {
      console.error('Login failed');
      this.toast.error('Invalid email or password');
    }
  }

  gotoSignup() {
    this.router.navigate(['/signup']);
  }
}
