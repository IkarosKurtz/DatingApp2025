import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { EditableMember, Member, Photo } from "../../types/member";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  editMode = signal<boolean>(false);

  public toggleEditMode(): void {
    this.editMode.set(!this.editMode());
  }

  public getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + "members/" + id);
  }

  public getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "members");
  }

  public getPhoto(id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  public updateMember(member: EditableMember): Observable<void> {
    return this.http.put<void>(this.baseUrl + "members", member);
  }
}
