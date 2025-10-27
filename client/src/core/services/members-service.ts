import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Member } from "../../types/member";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + "members/" + id);
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "members");
  }
}
