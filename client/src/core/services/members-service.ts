import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Member, Photo } from "../../types/member";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  public getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + "members/" + id);
  }

  public getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "members");
  }

  public getPhoto(id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }
}
