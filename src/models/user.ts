import { GuitarStructure } from './guitar';

export type ProtoUserStructure = {
  userName: string;
  email: string;
  password?: string;
  role: string;
  myGuitars: GuitarStructure[];
  token?: string;
};

export type UserStructure = { id: string } & ProtoUserStructure;

export type UserServerResponse = {
  results: UserStructure[];
};
