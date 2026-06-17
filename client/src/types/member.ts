export interface Member {
  id: string;
  birthday: string;
  imageUrl?: string;
  displayName: string;
  created: string;
  lastActive: string;
  gender: string;
  description?: string;
  city: string;
  country: string;
}

export interface Photo {
  id: number;
  url: string;
  publicId?: string;
  memberId: string;
}

export type EditableMember = Pick<
  Member,
  "displayName" | "description" | "city" | "country"
>;

export class MemberParams {
  gender?: string;
  minAge = 18;
  maxAge = 120;
  pageNumber = 1;
  pageSize = 10;
  orderBy = 'age';
}
