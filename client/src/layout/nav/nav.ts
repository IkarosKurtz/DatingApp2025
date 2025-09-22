import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private accountService = inject(AccountService);
  protected creds: any = {};

  public login() {
    this.accountService
      .login({ Email: this.creds.email, Password: this.creds.password })
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => alert(err.message),
      });
  }
}
