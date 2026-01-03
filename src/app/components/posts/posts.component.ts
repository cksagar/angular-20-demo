import { Component, signal, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Post } from './posts.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostComponent implements OnInit {
  posts = signal<Post[]>([]);
  isLoading = signal<boolean>(true);
  private masterService = inject(MasterService);

  ngOnInit() {
    this.masterService
      .getPosts()
      .pipe(
        map((data) => {
          return data.map((post: Post) => {
            return {
              ...post,
              title: post.title.toUpperCase(),
            };
          });
        }),
      )
      .subscribe({
        next: (data) => {
          console.log('Fetched data:', data);
          this.posts.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
        },
      });
  }
}
