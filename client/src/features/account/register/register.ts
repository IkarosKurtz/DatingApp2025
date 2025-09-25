import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/registerCreds';
import { User } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  membersFromHome = input.required<User[]>();
  protected creds: RegisterCreds = {} as RegisterCreds;

  public register(): void {
    console.log(this.creds);
  }

  public cancel(): void {
    console.log('cancel');
  }
}
