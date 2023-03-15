import { UserServerResponse, UserStructure } from '../../models/user';

export interface UserRepo<T> {
  create(userInfo: Partial<UserStructure>, action: string): Promise<T>;
}

export class UsersApiRepo implements UserRepo<UserServerResponse> {
  url: string;

  constructor() {
    this.url = 'http://localhost:5000/users';
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
}
