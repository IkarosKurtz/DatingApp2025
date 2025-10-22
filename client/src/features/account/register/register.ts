import { Component, inject, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AccountService } from "../../../core/services/account-service";
import { RegisterCreds } from "../../../types/registerCreds";

@Component({
  selector: "app-register",
  imports: [FormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class Register {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds: RegisterCreds = {} as RegisterCreds;

  public register(): void {
    this.accountService.register(this.creds).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
