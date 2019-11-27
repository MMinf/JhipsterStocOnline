import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface IExtendedUser {
  id?: number;
  birthday?: Moment;
  gender?: string;
  mobileNo?: number;
  user?: IUser;
}

export const defaultValue: Readonly<IExtendedUser> = {};
