import { setComputedStore, setEvent, setStore } from 're-event';
import {
  ArrowKeys,
  KEYS,
  KEYS_LIST,
  MAP_MOVE_STYLES_BY_KEY,
  MOVEMENT_DELTA,
  playerInfoTemplate,
  ValidKey,
} from '../constants';
import { PlayerInfo } from '../interfaces';
import { mapPlayerInfo } from '@entities/html-game/utils/map-player-info';

// --> События.
const setWallsDomRects = setEvent<DOMRect[]>();
const setInitialPlayerInfo = setEvent<PlayerInfo>();

const moveUp = setEvent<void>();
const moveRight = setEvent<void>();
const moveDown = setEvent<void>();
const moveLeft = setEvent<void>();

const startMoving = setEvent<ValidKey>();
const stopMoving = setEvent<void>();

const clearAll = setEvent<void>();

// --> Обработчики
export function handleSetWallsRects(svgRects: NodeListOf<SVGRectElement>) {
  const mappedRects = Array.from(svgRects).map(rect => rect.getBoundingClientRect());
  setWallsDomRects(mappedRects);
}

export function handleSetPlayerInitialInfo(domInfo: DOMRect) {
  setInitialPlayerInfo(mapPlayerInfo(playerInfoTemplate, domInfo));
}

export function handleKeyDown(event: KeyboardEvent) {
  if (isGameReady() && KEYS_LIST.includes(event.code)) {
    const keyCode = event.code as ValidKey;
    const { Up, Right, Down, Left } = KEYS;

    startMoving(keyCode);
    if (Up.includes(keyCode)) moveUp();
    if (Right.includes(keyCode)) moveRight();
    if (Down.includes(keyCode)) moveDown();
    if (Left.includes(keyCode)) moveLeft();
  }
}

export function handleKeyUp() {
  stopMoving();
}

function isGameReady() {
  const isWallsSetted = isWallsSettedStore.getState();
  const isUserInfoSetted = playerInfoStore.getState().isInitialInfoSetted;

  return isWallsSetted && isUserInfoSetted;
}

// --> Сторы.
/** Стор с координатами всех стен. */
const wallsDomRectsStore = setStore<DOMRect[]>([])
  .on(setWallsDomRects, (_, payload) => payload)
  .clear(clearAll);

/** Стор с информацией об игроке (его позиционирование и размеры). */
const playerInfoStore = setStore<PlayerInfo>(playerInfoTemplate)
  .on(setInitialPlayerInfo, (_, payload) => ({ ...payload, isInitialInfoSetted: true }))
  .on(moveUp, info => ({ ...info, y: info.y - MOVEMENT_DELTA }))
  .on(moveRight, info => ({ ...info, x: info.x + MOVEMENT_DELTA }))
  .on(moveDown, info => ({ ...info, y: info.y + MOVEMENT_DELTA }))
  .on(moveLeft, info => ({ ...info, x: info.x - MOVEMENT_DELTA }))
  .clear(clearAll);

/** Стор, содержайщий последнюю нажатую кнопку. */
const currentKeyStore = setStore<ValidKey>(ArrowKeys.ArrowUp)
  .on(startMoving, (_, payload) => payload)
  .clear(clearAll);

/** Вспомогательный стор, отвечающий на вопрос двигается ли игрок в данный момент. */
export const isPlayerMovingStore = setStore(false)
  .on(startMoving, () => true)
  .on(stopMoving, () => false)
  .clear(clearAll);

/** Вспомогательный стор, отвечающий на вопрос получены ли координаты всех стен. */
export const isWallsSettedStore = setComputedStore({
  store: wallsDomRectsStore,
  transform: value => value.length > 0,
});

/** Вычисляемый стор, содержащий текущий css класс, соответствующий направлению игрока. */
export const moveCssClassStore = setComputedStore({
  store: currentKeyStore,
  transform: key => MAP_MOVE_STYLES_BY_KEY[key],
});

/** Вычисляемый стор, содержащий стиль с позиционированием игрока. */
export const playerStyleStore = setComputedStore({
  store: playerInfoStore,
  transform: info => (info.isInitialInfoSetted ? { top: `${info.y}px`, left: `${info.x}px` } : {}),
});
