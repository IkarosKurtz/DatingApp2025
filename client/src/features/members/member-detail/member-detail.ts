import { Component, computed, inject, OnInit, signal } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { filter } from "rxjs";
import { AgePipe } from "../../../core/pipes/age-pipe";
import { AccountService } from "../../../core/services/account-service";
import { MembersService } from "../../../core/services/members-service";

@Component({
  selector: "app-member-detail",
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: "./member-detail.html",
  styleUrl: "./member-detail.css",
})
export class MemberDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);
  protected readonly membersService = inject(MembersService);
  protected title = signal<string | undefined>("Profile");
  protected isCurrentUser = computed(() => {
    return (
      this.accountService.currentUser()?.id ===
      this.route.snapshot.paramMap.get("id")
    );
  });

  public ngOnInit() {
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
