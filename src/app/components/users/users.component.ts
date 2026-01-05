import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from './user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  searchUser = new FormControl();

  userDetails = signal<User | null>(null);

  private masterService = inject(MasterService);
  private destroy$ = inject(DestroyRef);
  getUserDetails(userId: number) {
    if (!userId) return;

    this.masterService
      .getUserById(userId)
      .pipe(retry(3), takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: (data: User) => {
          console.log('Fetched user details:', data);
          this.userDetails.set(data);
        },
        error: (err: Error) => {
          console.log('Error fetching user details:', err);
          this.userDetails.set(null);
        },
      });
  }
}
