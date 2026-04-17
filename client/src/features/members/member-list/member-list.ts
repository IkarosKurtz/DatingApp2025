import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { Member } from "../../../types/member";
import { PaginationResult } from "../../../types/paginationMetadata";
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: "app-member-list",
  imports: [AsyncPipe, MemberCard],
  templateUrl: "./member-list.html",
  styleUrl: "./member-list.css",
})
export class MemberList {
  private readonly membersService = inject(MembersService);
  protected paginatedMembers$: Observable<PaginationResult<Member>>;

  constructor() {
    this.paginatedMembers$ = this.membersService.getMembers();
  }
}
