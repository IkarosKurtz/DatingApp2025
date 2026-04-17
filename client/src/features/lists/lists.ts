import { Component, inject, OnInit, signal } from "@angular/core";
import { LikesService } from "../../core/services/likes-service";
import { Paginator } from "../../shared/paginator/paginator";
import { Member } from "../../types/member";
import { PaginationResult } from "../../types/paginationMetadata";
import { MemberCard } from "../members/member-card/member-card";

@Component({
  selector: "app-lists",
  imports: [MemberCard, Paginator],
  templateUrl: "./lists.html",
  styleUrl: "./lists.css",
})
export class Lists implements OnInit {
  private likesService = inject(LikesService);
  protected paginatedResult = signal<PaginationResult<Member> | null>(null);
  protected predicate = "liked";
  protected pageNumber = 1;
  protected pageSize = 5;

  tabs = [
    { label: "Liked", value: "liked" },
    { label: "Liked me", value: "likedby" },
    { label: "Mutual", value: "mutual" },
  ];

  public ngOnInit(): void {
    this.loadLikes();
  }

  public setPredicate(predicate: string) {
    if (this.predicate !== predicate) {
      this.predicate = predicate;
      this.pageNumber = 1;
      this.loadLikes();
    }
  }

  public loadLikes() {
    this.likesService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => this.paginatedResult.set(response),
      });
  }

  public onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.pageNumber = event.pageNumber;
    this.pageSize = event.pageSize;
    this.loadLikes();
  }
}
