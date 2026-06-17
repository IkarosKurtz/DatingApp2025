import { HttpClient } from "@angular/common/http"
import { inject, Injectable, signal, WritableSignal } from "@angular/core"
import { Observable, tap } from "rxjs"
import { environment } from "../../environments/environment"
import { LoginCreds, RegisterCreds, User } from "../../types/user"
import { LikesService } from "./likes-service"

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private http = inject(HttpClient);
  private likesService = inject(LikesService);
  public baseURL = environment.apiUrl;
  public currentUser: WritableSignal<User | null> = signal(null);

  public login(creds: LoginCreds): Observable<User> {
    return this.http.post<User>(this.baseURL + "account/login", creds).pipe(
      tap((response) => {
        if (!response) return;
        this.setCurrentUser(response);
      }),
    );
  }

  setCurrentUser(user: User) {
    user.roles = this.getRolesFromToken(user);
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
    this.likesService.getLikeIds();
  }

  public register(cred: RegisterCreds): Observable<User> {
    return this.http.post<User>(this.baseURL + "account/register", cred).pipe(
      tap((user) => {
        if (!user) return;
        this.setCurrentUser(user);
      }),
    );
  }

  public logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("filters");
    this.likesService.clearLikeIds();
    this.currentUser.set(null);
  }

  private getRolesFromToken(user: User): string[] {
    const payload = user.token.split('.')[1];
    const decoded = atob(payload);
    const jsonPayload = JSON.parse(decoded);
    return Array.isArray(jsonPayload.role) ? jsonPayload.role : [jsonPayload.role];
  }
}
