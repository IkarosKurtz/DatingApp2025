import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  public baseURL = 'https://localhost:5001/api/';
  public currentUser: WritableSignal<User | null> = signal(null);

  public login(creds: any) {
    return this.http.post(this.baseURL + 'account/login', creds).pipe(
      tap((response: any) => {
        if (!response) return;
        this.setCurrentUser(response);
      })
    );
  }

  public setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  public logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
