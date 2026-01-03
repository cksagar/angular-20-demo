import { Routes } from '@angular/router';
import { PostComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: 'posts', component: PostComponent },
  { path: 'users', component: UsersComponent },
];
