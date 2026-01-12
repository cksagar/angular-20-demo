import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../shared/services/toaster.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: true,
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private toastr = inject(ToastService);
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSignupSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    console.log('Signup form submitted');
    console.log(this.signupForm.value);
    this.authService.signup({
        name: this.signupForm.value.name!,
        email: this.signupForm.value.email!,
        password: this.signupForm.value.password!,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Signup successful!', 'Success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup failed:', err);
          this.toastr.error('Signup failed. Please try again.', 'Error');
        },
      });
  }
}
