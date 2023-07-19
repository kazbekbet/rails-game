export type PlayerInfo = DOMRect & { isInitialInfoSetted: boolean };
export type Completable = { completed: boolean };

export type CompletableMarker = { id: MarkerTypes } & Completable;

export enum MarkerTypes {
  Hr = 'hr',
  Om = 'om',
  Sw = 'sw',
  Pmo = 'pmo',
  Back = 'back',
  Test = 'test',
  Analyst = 'analyst',
}

export enum ObstacleTypes {
  Wall = 'wall',
  Coin = 'coin',
  Marker = 'marker',
}

interface Collectable {
  show: boolean;
}
export enum ImageTypes {
  Man = 'man',
  Woman = 'woman',
}

export interface IDataSvg {
  id: string;
  imageType: ImageTypes;
  style: string;
  type: ObstacleTypes;
}

export type Obstacle<T> = { rect: T } & {
  uniqueId?: string;
  isThroughElement?: boolean;
  type?: ObstacleTypes;
  collectable?: Collectable;
  data?: Partial<IDataSvg>;
};

export type ItemIdType = 'notebook';

export interface IPlayerEquipment {
  id: ItemIdType;
  description?: string;
  title: string;
  isCanUse: boolean;
}
