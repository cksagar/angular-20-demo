import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../components/posts/posts.model';
import { User } from '../components/users/user.model';
import { Product } from '../components/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private userDetails = new Map<number, Observable<User>>();

  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }

  searchProducts(query:string): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/search?q=${query}`);
 }
}
