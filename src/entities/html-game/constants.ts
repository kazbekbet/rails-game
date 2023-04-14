import { PlayerInfo } from './interfaces';
import styles from './styles/html-game.module.scss';

export type ValidKey = ArrowKeys | LetterKeys;

export enum ArrowKeys {
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

export enum LetterKeys {
  KeyD = 'KeyD',
  KeyA = 'KeyA',
  KeyW = 'KeyW',
  KeyS = 'KeyS',
}

export const playerInfoTemplate: PlayerInfo = {
  x: -100,
  y: -100,
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  isInitialInfoSetted: false,
  toJSON() {},
};

export const KEYS = {
  Right: [ArrowKeys.ArrowRight, LetterKeys.KeyD],
  Left: [ArrowKeys.ArrowLeft, LetterKeys.KeyA],
  Up: [ArrowKeys.ArrowUp, LetterKeys.KeyW],
  Down: [ArrowKeys.ArrowDown, LetterKeys.KeyS],
};

export const KEYS_LIST: string[] = Object.values(KEYS).reduce((prev, curr) => {
  prev.push(...curr);
  return prev;
}, []);

export const MAP_MOVE_STYLES_BY_KEY = {
  [ArrowKeys.ArrowUp]: styles.up,
  [ArrowKeys.ArrowDown]: styles.down,
  [ArrowKeys.ArrowRight]: styles.right,
  [ArrowKeys.ArrowLeft]: styles.left,

  [LetterKeys.KeyW]: styles.up,
  [LetterKeys.KeyS]: styles.down,
  [LetterKeys.KeyD]: styles.right,
  [LetterKeys.KeyA]: styles.left,
};

export const MOVEMENT_DELTA = 1;
