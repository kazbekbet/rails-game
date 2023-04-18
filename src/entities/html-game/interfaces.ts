export type PlayerInfo = DOMRect & { isInitialInfoSetted: boolean; };

export enum MarkerTypes {
  Hr = 'hr',
  Marketing = 'marketing',
  Sw = 'sw',
  Teamlead = 'teamlead',
}

export type MayBeUnique<T> = { rect: T } & { uniqueId?: string };
