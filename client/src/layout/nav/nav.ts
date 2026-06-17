import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { AccountService } from '../../core/services/account-service'
import { BusyService } from '../../core/services/busy-service'
import { ToastService } from '../../core/services/toast-service'
import { HasRole } from '../../shared/directives/has-role'
import { themes } from '../theme'

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive, HasRole],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  private readonly routerService = inject(Router);
  private readonly toastService = inject(ToastService);
  protected readonly busyService = inject(BusyService);
  protected readonly accountService = inject(AccountService);
  protected creds: any = {};
  protected isLoggedIn: WritableSignal<boolean> = signal(false);
  protected selectedTheme = signal<string>(
    localStorage.getItem("Theme") || "light",
  );
  protected themes = themes;

  public ngOnInit() {
    document.documentElement.setAttribute("data-theme", this.selectedTheme());
  }

  public login() {
    this.accountService
      .login({ email: this.creds.email, password: this.creds.password })
      .subscribe({
        next: (res) => {
          this.routerService.navigateByUrl("/members");
          this.creds = {};
          this.toastService.success("Logged In!");
        },
        error: (err) => {
          this.toastService.error(err.error);
        },
      });
  }

  public logout() {
    this.accountService.logout();
    this.routerService.navigateByUrl("/");
  }

  public handleSelectedTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);

    const elem = document.activeElement as HTMLDivElement;
    if (!elem) {
      return;
    }

    elem.blur();
  }
}
