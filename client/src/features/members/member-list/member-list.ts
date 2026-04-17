import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { Paginator } from "../../../shared/paginator/paginator";
import { Member } from "../../../types/member";
import { PaginationResult } from "../../../types/paginationMetadata";
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: "app-member-list",
  imports: [AsyncPipe, MemberCard, Paginator],
  templateUrl: "./member-list.html",
  styleUrl: "./member-list.css",
})
export class MemberList {
  private readonly membersService = inject(MembersService);
  protected paginatedMembers$?: Observable<PaginationResult<Member>>;
  pageNumber = 1;
  pageSize = 5;

  constructor() {
    this.loadMembers();
  }

  loadMembers() {
    this.paginatedMembers$ = this.membersService.getMembers(
      this.pageNumber,
      this.pageSize,
    );
  }

  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.pageNumber = event.pageNumber;
    this.pageSize = event.pageSize;
    this.loadMembers();
  }
}
