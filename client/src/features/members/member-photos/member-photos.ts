import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { MembersService } from "../../../core/services/members-service";
import { Photo } from "../../../types/member";

@Component({
  selector: "app-member-photos",
  imports: [AsyncPipe],
  templateUrl: "./member-photos.html",
  styleUrl: "./member-photos.css",
})
export class MemberPhotos {
  private readonly memberService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  protected photos$?: Observable<Photo[]>;

  public constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get("id");

    if (!memberId) {
      return;
    }

    this.photos$ = this.memberService.getPhoto(memberId);
  }

  public getPhotoMock(): Pick<Photo, "url">[] {
    return Array.from({ length: 20 }, (_, i) => ({
      url: "./user.jpg",
    }));
  }
}
