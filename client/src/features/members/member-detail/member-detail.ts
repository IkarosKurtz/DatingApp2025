import { AsyncPipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { filter, Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { Member } from "../../../types/member";

@Component({
  selector: "app-member-detail",
  imports: [AsyncPipe, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: "./member-detail.html",
  styleUrl: "./member-detail.css",
})
export class MemberDetail {
  private readonly memberService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected member$?: Observable<Member>;
  protected title = signal<string | undefined>("Profile");

  public constructor() {
    this.member$ = this.loadMember();
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.title.set(this.route.firstChild?.snapshot?.title);
        },
      });
  }

  private loadMember(): Observable<Member> | undefined {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      return this.memberService.getMember(id);
    }

    return;
  }
}
