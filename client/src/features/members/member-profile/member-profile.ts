import { DatePipe } from "@angular/common";
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MembersService } from "../../../core/services/members-service";
import { ToastService } from "../../../core/services/toast-service";
import { EditableMember, Member } from "../../../types/member";

@Component({
  selector: "app-member-profile",
  imports: [DatePipe, FormsModule],
  templateUrl: "./member-profile.html",
  styleUrl: "./member-profile.css",
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild("memberProfileEditForm") memberProfileEditForm?: NgForm;
  @HostListener("window:beforeunload", ["$event"]) notify(
    $event: BeforeUnloadEvent,
  ) {
    if (this.memberProfileEditForm?.dirty) {
      $event.preventDefault();
    }
  }
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  protected member = signal<Member | undefined>(undefined);
  protected membersService = inject(MembersService);
  protected editableMember: EditableMember = {
    displayName: "",
    description: "",
    city: "",
    country: "",
  };

  public ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.member.set(data["member"]);
      },
    });

    this.editableMember = {
      displayName: this.member()?.displayName ?? "",
      description: this.member()?.description ?? "",
      city: this.member()?.city ?? "",
      country: this.member()?.country ?? "",
    };
  }

  public ngOnDestroy(): void {
    if (!this.membersService.editMode()) return;

    this.membersService.editMode.set(false);
  }

  public updateProfile(): void {
    if (!this.member()) return;

    const updatedMember = {
      ...this.member(),
      ...this.editableMember,
    };

    console.group("Updated Member");
    console.log(updatedMember);
    console.groupEnd();
    this.toast.success("Profile updated successfully");
    this.membersService.editMode.set(false);
  }
}
