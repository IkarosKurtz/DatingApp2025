import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { EditableMember, Member, Photo } from "../../types/member";

@Injectable({
  providedIn: "root",
})
export class MembersService {
  private readonly http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  public editMode = signal<boolean>(false);
  public member = signal<Member | null>(null);

  public toggleEditMode(): void {
    this.editMode.set(!this.editMode());
  }

  public getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + "members/" + id).pipe(
      tap((member) => {
        this.member.set(member);
      }),
    );
  }

  public getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "members");
  }

  public getPhotos(id: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  public updateMember(member: EditableMember): Observable<void> {
    return this.http.put<void>(this.baseUrl + "members", member);
  }

  public uploadPhoto(file: File): Observable<Photo> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<Photo>(this.baseUrl + "photos", formData);
  }

  public setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + "members/photo/" + photo.id, {});
  }
}
