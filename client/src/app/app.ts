import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { Nav } from '../layout/nav/nav';
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http: HttpClient = inject(HttpClient);
  private accountService: AccountService = inject(AccountService);
  protected readonly title = signal('APPsito');
  protected members = signal<User[]>([]);

  public ngOnInit(): void {
    this.setCurrentUser();
  }

  private setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  public setMembers() {
    this.getMembers().then((members: any) => {
      this.members.set(members);
      console.log(members);
    });
  }

  public async getMembers(): Promise<User[]> {
    try {
      return await lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
