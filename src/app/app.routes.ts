import { Routes } from '@angular/router';
import { PostComponent } from './components/posts/posts.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: 'posts', component: PostComponent },
  { path: 'users', component: UserComponent },
];
