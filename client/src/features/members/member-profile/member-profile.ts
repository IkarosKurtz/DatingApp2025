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
import { TimeAgoPipe } from "../../../core/pipes/time-ago-pipe";
import { AccountService } from "../../../core/services/account-service";
import { MembersService } from "../../../core/services/members-service";
import { ToastService } from "../../../core/services/toast-service";
import { EditableMember, Member } from "../../../types/member";

@Component({
  selector: "app-member-profile",
  imports: [DatePipe, FormsModule, TimeAgoPipe],
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
  private readonly accountService = inject(AccountService);
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
    this.editableMember = {
      displayName: this.membersService.member()?.displayName ?? "",
      description: this.membersService.member()?.description ?? "",
      city: this.membersService.member()?.city ?? "",
      country: this.membersService.member()?.country ?? "",
    };
  }

  public ngOnDestroy(): void {
    if (!this.membersService.editMode()) return;

    this.membersService.editMode.set(false);
  }

  public updateProfile(): void {
    if (!this.membersService.member()) return;

    const updatedMember = {
      ...this.membersService.member()!,
      ...this.editableMember,
    };

    this.membersService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (
          currentUser &&
          updatedMember.displayName !== currentUser?.displayName
        ) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.membersService.editMode.set(false);
        this.membersService.member.set(updatedMember as Member);
        this.memberProfileEditForm?.reset(updatedMember);
        this.toast.success("Profile updated successfully");
      },
    });
  }
}
