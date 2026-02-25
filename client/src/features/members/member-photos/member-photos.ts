import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "../../../core/services/account-service";
import { MembersService } from "../../../core/services/members-service";
import { ImageUpload } from "../../../shared/image-upload/image-upload";
import { Member, Photo } from "../../../types/member";
import { User } from "../../../types/user";

@Component({
  selector: "app-member-photos",
  imports: [ImageUpload],
  templateUrl: "./member-photos.html",
  styleUrl: "./member-photos.css",
})
export class MemberPhotos implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly accountService = inject(AccountService);
  protected readonly membersService = inject(MembersService);
  protected photos = signal<Photo[]>([]);
  protected loading = signal<boolean>(false);

  public ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get("id");

    if (!memberId) {
      return;
    }

    this.membersService.getPhotos(memberId).subscribe({
      next: (photos) => {
        this.photos.set(photos);
      },
    });
  }

  public getPhotoMock(): Pick<Photo, "url">[] {
    return Array.from({ length: 1 }, (_, i) => ({
      url: "./user.png",
    }));
  }

  public onUploadImage(file: File): void {
    this.loading.set(true);
    this.membersService.uploadPhoto(file).subscribe({
      next: (photo) => {
        this.membersService.editMode.set(false);
        this.loading.set(false);
        this.photos.update((photos) => [...photos, photo]);
      },
      error: (error) => {
        console.log("Error while uploading the image: ", error);
        this.loading.set(false);
      },
    });
  }

  public setMainPhoto(photo: Photo) {
    this.membersService.setMainPhoto(photo).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser) currentUser.imageUrl = photo.url;
        this.accountService.setCurrentUser(currentUser as User);
        this.membersService.member.update(
          (member) =>
            ({
              ...member,
              imageUrl: photo.url,
            }) as Member,
        );
      },
    });
  }
}
