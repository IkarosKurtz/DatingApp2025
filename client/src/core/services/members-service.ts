import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import {
  EditableMember,
  Member,
  MemberParams,
  Photo,
} from "../../types/member";
import { PaginationResult } from "../../types/paginationMetadata";

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

  getMembers(memberParams: MemberParams): Observable<PaginationResult<Member>> {
    let params = new HttpParams();
    params = params.append("pageNumber", memberParams.pageNumber);
    params = params.append("pageSize", memberParams.pageSize);
    params = params.append("minAge", memberParams.minAge);
    params = params.append("maxAge", memberParams.maxAge);
    params = params.append("orderBy", memberParams.orderBy);
    if (memberParams.gender)
      params = params.append("gender", memberParams.gender);

    return this.http
      .get<PaginationResult<Member>>(this.baseUrl + "members", { params })
      .pipe(
        tap(() => {
          localStorage.setItem("filters", JSON.stringify(memberParams));
        }),
      );
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
    return this.http.post<Photo>(this.baseUrl + "members/photo", formData);
  }

  public setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + "members/photo/" + photo.id, {});
  }

  public deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "members/photo/" + photoId);
  }
}
