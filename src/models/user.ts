import { GuitarStructure } from './guitar';

export type ProtoUserStructure = {
  username: string;
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
