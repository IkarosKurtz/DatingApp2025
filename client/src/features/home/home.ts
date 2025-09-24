import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected registerMode: WritableSignal<boolean> = signal(false);

  public showRegister(): void {
    this.registerMode.set(true);
  }
}
