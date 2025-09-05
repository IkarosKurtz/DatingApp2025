import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http: HttpClient = inject(HttpClient);
  protected readonly title = signal('APPsito');
  protected members = signal<any[]>([]);

  public ngOnInit(): void {
    // this.getMembers().then((members: any) => {
    //   this.members.set(members);
    //   console.log(members);
    // });
  }

  public setMembers() {
    this.getMembers().then((members: any) => {
      this.members.set(members);
      console.log(members);
    });
  }

  public async getMembers() {
    try {
      return await lastValueFrom(this.http.get('https://localhost:5001/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
