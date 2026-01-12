import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';

interface User {
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'isLoggedIn';
  private readonly USER_KEY = 'loggedInUser';
  private readonly USERS_KEY = 'app_users';

  private usersArray: User[] = this.loadUsers();

  private loadUsers(): User[] {
    const usersJson = sessionStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(): void {
    sessionStorage.setItem(this.USERS_KEY, JSON.stringify(this.usersArray));
  }

  signup(user: User): Observable<string> {
    const userExists = this.usersArray.some((u) => u.email === user.email);

    if (userExists) {
      return throwError(() => 'User already exists');
    }

    this.usersArray.push(user);
    this.saveUsers();
    return of('User registered successfully').pipe(delay(1000));
  }


  // Replace the credential check with your real logic
  login(email: string, password: string): boolean {
    const valid = email === 'admin' && password === 'admin'; // demo check
    if (valid) {
      sessionStorage.setItem(this.SESSION_KEY, 'true');
      sessionStorage.setItem(this.USER_KEY, JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.SESSION_KEY) === 'true';
  }

  getUser(): { email: string } | null {
    const raw = sessionStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }
}
