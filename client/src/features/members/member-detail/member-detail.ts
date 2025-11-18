import { Component, inject, OnInit, signal } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { filter } from "rxjs";
import { Member } from "../../../types/member";

@Component({
  selector: "app-member-detail",
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: "./member-detail.html",
  styleUrl: "./member-detail.css",
})
export class MemberDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected member = signal<Member | undefined>(undefined);
  protected title = signal<string | undefined>("Profile");

  public ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.member.set(data["member"]);
      },
    });
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.title.set(this.route.firstChild?.snapshot?.title);
        },
      });
  }
}
