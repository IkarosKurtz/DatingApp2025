import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/registerCreds';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  cancelRegister = output<boolean>();
  protected creds: RegisterCreds = {} as RegisterCreds;

  public register(): void {
    console.log(this.creds);
  }

  public cancel(): void {
    this.cancelRegister.emit(false);
  }
}
