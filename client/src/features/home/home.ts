import { Component, Input, signal, WritableSignal } from '@angular/core';
import { User } from '../../types/user';
import { Register } from '../account/register/register';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input({ required: true }) membersFromApp: User[] = [];
  protected registerMode: WritableSignal<boolean> = signal(false);

  public showRegister(): void {
    this.registerMode.set(true);
  }
}
