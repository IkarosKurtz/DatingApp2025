import { Routes } from "@angular/router";
import { Home } from "../features/home/home";

export const routes: Routes = [
  { path: "", component: Home },
  { path: "members", component: MemberList },
  { path: "members/{id}", component: MemberDetail },
  { path: "lists", component: Lists },
  { path: "messages", component: Messages },
  { path: "**", component: Home },
];
