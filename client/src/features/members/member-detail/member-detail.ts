import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { Member } from "../../../types/member";

@Component({
  selector: "app-member-detail",
  imports: [AsyncPipe],
  templateUrl: "./member-detail.html",
  styleUrl: "./member-detail.css",
})
export class MemberDetail {
  private readonly memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable<Member>;

  public constructor() {
    this.member$ = this.loadMember();
  }

  private loadMember(): Observable<Member> | undefined {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      return this.memberService.getMember(id);
    }

    return;
  }
}
