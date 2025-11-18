import { Routes } from "@angular/router";
import { authGuard } from "../core/guard/auth-guard";
import { Home } from "../features/home/home";
import { Lists } from "../features/lists/lists";
import { MemberDetail } from "../features/members/member-detail/member-detail";
import { MemberList } from "../features/members/member-list/member-list";
import { MemberMessages } from "../features/members/member-messages/member-messages";
import { MemberPhotos } from "../features/members/member-photos/member-photos";
import { MemberProfile } from "../features/members/member-profile/member-profile";
import { memberResolver } from "../features/members/member-resolver";
import { Messages } from "../features/messages/messages";
import { NotFound } from "../features/not-found/not-found";
import { ServerError } from "../features/server-error/server-error";
import { TestErrors } from "../features/test-errors/test-errors";

export const routes: Routes = [
  { path: "", component: Home },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [authGuard],
    children: [
      { path: "members", component: MemberList },
      {
        path: "members/:id",
        resolve: { member: memberResolver },
        runGuardsAndResolvers: "always",
        component: MemberDetail,
        children: [
          { path: "", redirectTo: "profile", pathMatch: "full" },
          { path: "profile", component: MemberProfile, title: "Profile" },
          { path: "photos", component: MemberPhotos, title: "Photos" },
          { path: "messages", component: MemberMessages, title: "Messages" },
        ],
      },
      { path: "lists", component: Lists },
      { path: "messages", component: Messages },
    ],
  },
  { path: "server-error", component: ServerError },
  { path: "errors", component: TestErrors },
  { path: "**", component: NotFound },
];
