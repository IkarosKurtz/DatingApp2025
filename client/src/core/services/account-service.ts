import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { RegisterCreds } from "../../types/registerCreds";
import { LoginCreds, User } from "../../types/user";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private http = inject(HttpClient);
  public baseURL = "https://localhost:5001/api/";
  public currentUser: WritableSignal<User | null> = signal(null);

  public login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(this.baseURL + "account/login", creds).pipe(
      tap((response) => {
        if (!response) return;
        this.setCurrentUser(response);
      })
    );
  }

  public setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
  }

  public register(cred: RegisterCreds): Observable<User> {
    return this.http.post<User>(this.baseURL + "account/register", cred).pipe(
      tap((user) => {
        if (!user) return;
        this.setCurrentUser(user);
      })
    );
  }

  public logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }
}
