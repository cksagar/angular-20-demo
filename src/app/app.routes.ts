import { Routes } from '@angular/router';
import { PostComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { Products } from './components/products/products.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'posts', component: PostComponent },
  { path: 'users', component: UsersComponent },
  { path: 'products', component: Products },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
