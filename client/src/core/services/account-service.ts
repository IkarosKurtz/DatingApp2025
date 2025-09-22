import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  public baseURL = 'https://localhost:5001/api/';

  public login(creds: any) {
    return this.http.post(this.baseURL + 'account/login', creds);
  }
}
