import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AccountService } from "../../core/services/account-service";
import { ToastService } from "../../core/services/toast-service";
@Component({
  selector: "app-nav",
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: "./nav.html",
  styleUrl: "./nav.css",
})
export class Nav {
  private router = inject(Router);
  private toast = inject(ToastService);
  protected accountService = inject(AccountService);
  protected creds: any = {};
  protected isLoggedIn: WritableSignal<boolean> = signal(false);

  public login() {
    this.accountService
      .login({ email: this.creds.email, password: this.creds.password })
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl("/members");
          this.creds = {};
          this.toast.success("Logged In!");
        },
        error: (err) => {
          this.toast.error(err.error);
        },
      });
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
