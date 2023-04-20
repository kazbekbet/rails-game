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

export type MayBeUnique<T> = { rect: T } & { uniqueId?: string };
