export type ProtoGuitarStructure = {
  brand: string;
  model: string;
  picture: string;
  style: string;
  material: string;
  price: number;
  description: string;
};

export type GuitarStructure = { id: string } & ProtoGuitarStructure;

export type GuitarServerResponse = {
  results: GuitarStructure[];
};
