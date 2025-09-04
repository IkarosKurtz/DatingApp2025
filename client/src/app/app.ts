import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http: HttpClient = inject(HttpClient);
  protected readonly title = signal('APPsito');

  public ngOnInit(): void {
    this.http.get('https://localhost:5001/members').subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err),
      complete: () => console.log('Completed'),
    });
  }
}
