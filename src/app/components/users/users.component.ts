import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from './user.model';

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

  getUserDetails(userId: number) {
    if (!userId) return;

    this.masterService.getUserById(userId).subscribe((data) => {
      console.log('user details', data);
      this.userDetails.set(data);
    });
  }
}
