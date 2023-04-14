export type PlayerInfo = Pick<DOMRect, 'bottom' | 'height' | 'left' | 'right' | 'top' | 'width' | 'x' | 'y'> & {
  isInitialInfoSetted: boolean;
};

export enum MarkerTypes {
  Hr = 'hr',
  Marketing = 'marketing',
  Sw = 'sw',
  Teamlead = 'teamlead',
}

export type MarkerRectMap = Map<MarkerTypes, DOMRect>;
