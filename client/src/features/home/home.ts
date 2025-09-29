import { Component, signal, WritableSignal } from "@angular/core";
import { Register } from "../account/register/register";

@Component({
  selector: "app-home",
  imports: [Register],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  protected registerMode: WritableSignal<boolean> = signal(false);

  public showRegister(value: boolean): void {
    this.registerMode.set(value);
  }
}
