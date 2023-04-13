export type PlayerInfo = Pick<DOMRect, 'bottom' | 'height' | 'left' | 'right' | 'top' | 'width' | 'x' | 'y'> & {
  isInitialInfoSetted: boolean;
};
