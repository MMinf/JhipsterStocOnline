export interface INotifiTemplate {
  id?: number;
  emailAddresses?: string;
  message?: string;
}

export const defaultValue: Readonly<INotifiTemplate> = {};
