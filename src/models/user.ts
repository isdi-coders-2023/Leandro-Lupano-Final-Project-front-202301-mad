import { GuitarStructure } from './guitar';

export type UserStructure = {
  id: string;
  userName: string;
  email: string;
  password?: string;
  role: string;
  myGuitars: GuitarStructure[];
  token?: string;
};

export type UserServerResponse = {
  results: UserStructure[];
};
