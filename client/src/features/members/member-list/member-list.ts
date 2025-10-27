import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { MemberCard } from "../../../member-card/member-card";
import { Member } from "../../../types/member";

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
