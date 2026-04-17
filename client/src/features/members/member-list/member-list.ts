import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
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
export class MemberList implements OnInit {
  private readonly membersService = inject(MembersService);
  protected paginatedMembers = signal<PaginationResult<Member> | null>(null);
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: (result) => {
        this.paginatedMembers.set(result);
      },
    });
  }

  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.pageNumber = event.pageNumber;
    this.pageSize = event.pageSize;
    this.loadMembers();
  }
}
