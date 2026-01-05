import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Post } from './posts.model';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of } from 'rxjs';
import { User } from '../users/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostComponent implements OnInit {
  posts = signal<Post[]>([]);
  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);
  private masterService = inject(MasterService);
  private destroy$ = inject(DestroyRef);

  ngOnInit() {
    forkJoin([
      this.masterService.getPosts().pipe(catchError(() => of([]))),
      this.masterService.getUsers().pipe(catchError(() => of([]))),
    ])
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: (data) => {
          this.isLoading.set(false);
          this.posts.set(data[0]);
          this.users.set(data[1]);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
        },
      });

    // this.masterService
    //   .getPosts()
    //   .pipe(
    //     takeUntilDestroyed(),
    //     map((data) => {
    //       return data.map((post: Post) => {
    //         return {
    //           ...post,
    //           title: post.title.toUpperCase(),
    //         };
    //       });
    //     }),
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       console.log('Fetched data:', data);
    //       this.posts.set(data);
    //       this.isLoading.set(false);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isLoading.set(false);
    //     },
    //   });
  }
}
