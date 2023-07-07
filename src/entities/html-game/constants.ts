import { ImageTypes, MarkerTypes, ObstacleTypes, PlayerInfo } from './interfaces';
import styles from './styles/html-game.module.scss';
import coinsSound from '@assets/sounds/comp_coin.wav';
import man from '@assets/markers/male_1.gif';
import woman from '@assets/markers/woman.gif';
import classNames from 'classnames';

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

/** Кнопки - shift. */
export enum ShiftKeys {
  ShiftLeft = 'ShiftLeft',
  ShiftRight = 'ShiftRight',
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
  Right: new Set([ArrowKeys.ArrowRight, LetterKeys.KeyD]),
  Left: new Set([ArrowKeys.ArrowLeft, LetterKeys.KeyA]),
  Up: new Set([ArrowKeys.ArrowUp, LetterKeys.KeyW]),
  Down: new Set([ArrowKeys.ArrowDown, LetterKeys.KeyS]),
};

/** Доступные кнопки для передвижения (используется для проверки). */
export const AllowedKeysList: Set<ArrowKeys | LetterKeys> = Object.values(AllowedKeys).reduce((prev, curr) => {
  curr.forEach(key => prev.add(key));
  return prev;
}, new Set());

/** Список кнопок для ускорения. */
export const AccelerationKeys = new Set(Object.values(ShiftKeys));

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

/** Список маркеров. */
export const MarkersList = new Set(Object.values(MarkerTypes));

/** Скорость передвижения в px. */
export const MovementDeltaPx = 1;

/** Скорость передвижения при нажатой клавише shift. */
export const ShiftSpeedPx = 5;

/** Звук сбора монеты. */
export const CoinsCollectSound = new Audio(coinsSound);

export const ImageForType: { [key in ImageTypes]: string } = {
  man: man,
  woman: woman,
};

const markersClass = {
  male: classNames(styles.marker, styles.male),
  female: classNames(styles.marker, styles.female),
};

export const ClassNamesForType: { [key in ImageTypes]: string } = {
  man: markersClass.male,
  woman: markersClass.female,
};
