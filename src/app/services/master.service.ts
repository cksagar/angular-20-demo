import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../components/posts/posts.model';
import { User } from '../components/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private userDetails = new Map<number, Observable<User>>();

  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getUserDetails(id: number) {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + id);
  }
}
