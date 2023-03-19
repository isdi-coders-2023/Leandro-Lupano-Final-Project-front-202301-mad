import { GuitarServerResponse, GuitarStructure } from '../../models/guitar';

export interface GuitarsRepo<T> {
  read(token: string, style?: string, page?: string): Promise<T>;
  readId(token: string, idGuitar: GuitarStructure['id']): Promise<T>;
  create(token: string, guitarInfo: Partial<GuitarStructure>): Promise<T>;
}

export class GuitarsApiRepo implements GuitarsRepo<GuitarServerResponse> {
  url: string;

  constructor() {
    this.url = 'http://localhost:5000/guitars';
  }

  async read(
    token: string,
    style?: string,
    page?: string
  ): Promise<GuitarServerResponse> {
    if (!style) style = '';
    if (!page) page = '';

    const url = this.url + '/products?style=' + style + '&page=' + page;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarsData = (await resp.json()) as GuitarServerResponse;

    return guitarsData;
  }

  async readId(
    token: string,
    idGuitar: GuitarStructure['id']
  ): Promise<GuitarServerResponse> {
    const url = this.url + '/details/' + idGuitar;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarData = (await resp.json()) as GuitarServerResponse;

    return guitarData;
  }

  async create(
    token: string,
    guitarInfo: Partial<GuitarStructure>
  ): Promise<GuitarServerResponse> {
    const url = this.url + '/create';

    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(guitarInfo),
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (!resp.ok)
      throw new Error('Error http: ' + resp.status + resp.statusText);

    const guitarData = (await resp.json()) as GuitarServerResponse;

    return guitarData;
  }
}
