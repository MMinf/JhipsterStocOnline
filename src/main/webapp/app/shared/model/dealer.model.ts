import { IUser } from 'app/shared/model/user.model';
import { TipuriAuto } from 'app/shared/model/enumerations/tipuri-auto.model';

export interface IDealer {
  id?: number;
  name?: string;
  description?: string;
  tipAutovehicule?: TipuriAuto;
  dealerId?: string;
  users?: IUser[];
}

export const defaultValue: Readonly<IDealer> = {};
