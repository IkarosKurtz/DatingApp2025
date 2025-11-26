import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { Member } from "../../../types/member";
import { MemberCard } from "../../members/member-card/member-card";

@Component({
  selector: "app-member-list",
  imports: [AsyncPipe, MemberCard],
  templateUrl: "./member-list.html",
  styleUrl: "./member-list.css",
})
export class MemberList {
  private readonly membersService = inject(MembersService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.membersService.getMembers();
  }
}
