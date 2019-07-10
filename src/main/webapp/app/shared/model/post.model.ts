import { IUser } from '@/shared/model/user.model';

export interface IPost {
  id?: number;
  name?: string;
  age?: number;
  user?: IUser;
}

export class Post implements IPost {
  constructor(public id?: number, public name?: string, public age?: number, public user?: IUser) {}
}
