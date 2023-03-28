import { GuitarStructure } from '../../models/guitar';
import { UserServerResponse, UserStructure } from '../../models/user';

export interface UserRepo<T> {
  create(userInfo: Partial<UserStructure>, action: string): Promise<T>;
  readId(idUser: UserStructure['id'], token: string): Promise<T>;
  update(
    idGuitar: GuitarStructure['id'],
    token: string,
    action: string
  ): Promise<T>;
}

export class UsersApiRepo implements UserRepo<UserServerResponse> {
  url: string;

  constructor() {
    // LOCAL HOST URL:
    // this.url = 'http://localhost:5000/users';
    // RENDER HOST URL:
    this.url =
      'https://leandro-lupano-final-project-back-202301.onrender.com/users';
  }

  async create(
    userInfo: Partial<UserStructure>,
    action: string
  ): Promise<UserServerResponse> {
    const url = this.url + '/' + action;

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const userData = (await resp.json()) as UserServerResponse;

    return userData;
  }

  async readId(
    idUser: UserStructure['id'],
    token: string
  ): Promise<UserServerResponse> {
    const url = this.url + '/' + idUser;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const userData = (await resp.json()) as UserServerResponse;

    return userData;
  }

  async update(
    idGuitar: GuitarStructure['id'],
    token: string,
    action: string
  ): Promise<UserServerResponse> {
    const url = this.url + '/' + action + '/cart/' + idGuitar;

    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const userData = (await resp.json()) as UserServerResponse;

    return userData;
  }
}
