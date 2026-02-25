import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-icon-button",
  imports: [],
  templateUrl: "./icon-button.html",
  styleUrl: "./icon-button.css",
})
export class IconButton {
  public disabled = input<boolean>();
  public selected = input<boolean>();
  public clickEvent = output<Event>();

  public onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
