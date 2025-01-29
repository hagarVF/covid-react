export interface StatsicsInterface {
  message: string;
  result: Result[];
}

export interface MainInterface {
  result: Result[];
}

export interface Result {
  _id: string;
  image: string;
  imageId: ImageID;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface ImageID {
  _id: string;
  name: string;
  cases: number;
  death: number;
  recover: number;
  years: Year[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Year {
  year: number;
  month: number;
  deaths: number;
  _id: string;
}
