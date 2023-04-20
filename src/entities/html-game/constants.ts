import { PlayerInfo } from './interfaces';
import styles from './styles/html-game.module.scss';

export type ValidKey = ArrowKeys | LetterKeys;

/** Кнопки - стрелки. */
export enum ArrowKeys {
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

/** Кнопки - WASD. */
export enum LetterKeys {
  KeyD = 'KeyD',
  KeyA = 'KeyA',
  KeyW = 'KeyW',
  KeyS = 'KeyS',
}

/** Начальный (нулевой) шаблон информации об игроке. */
export const PlayerInfoTemplate: PlayerInfo = {
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
} as const;

/** Доступные кнопки для передвижения в зависимости от направления. */
export const AllowedKeys = {
  Right: [ArrowKeys.ArrowRight, LetterKeys.KeyD],
  Left: [ArrowKeys.ArrowLeft, LetterKeys.KeyA],
  Up: [ArrowKeys.ArrowUp, LetterKeys.KeyW],
  Down: [ArrowKeys.ArrowDown, LetterKeys.KeyS],
};

/** Доступные кнопки для передвижения (используется для проверки). */
export const AllowedKeysList: string[] = Object.values(AllowedKeys).reduce((prev, curr) => {
  prev.push(...curr);
  return prev;
}, []);

/** Зависимость стилей от нажатой кнопки. */
export const MapMoveStylesByKey = {
  [ArrowKeys.ArrowUp]: styles.up,
  [ArrowKeys.ArrowDown]: styles.down,
  [ArrowKeys.ArrowRight]: styles.right,
  [ArrowKeys.ArrowLeft]: styles.left,

  [LetterKeys.KeyW]: styles.up,
  [LetterKeys.KeyS]: styles.down,
  [LetterKeys.KeyD]: styles.right,
  [LetterKeys.KeyA]: styles.left,
} as const;

/** Скорость передвижения в px. */
export const MovementDeltaPx = 1;
