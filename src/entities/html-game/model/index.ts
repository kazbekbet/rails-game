import { setComputedStore, setEvent, setStore } from 're-event';
import {
  ArrowKeys,
  AllowedKeys,
  AllowedKeysList,
  MapMoveStylesByKey,
  MovementDeltaPx,
  PlayerInfoTemplate,
  ValidKey,
  MarkersList,
} from '../constants';
import { MarkerTypes, PlayerInfo, MayBeUnique, CompletableMarker } from '../interfaces';
import { mapPlayerInfo } from '../utils/map-player-info';
import { CollisionDetector } from '../utils/physics';
import { signal } from '@libs/signal';

// --> События.
const setWallsDomRects = setEvent<MayBeUnique<DOMRect>[]>();
const setInitialPlayerInfo = setEvent<PlayerInfo>();
const setMarkersRefs = setEvent<MayBeUnique<DOMRect>[]>();
const setMarkerComplete = setEvent<MarkerTypes>();

const moveUp = setEvent<void>();
const moveRight = setEvent<void>();
const moveDown = setEvent<void>();
const moveLeft = setEvent<void>();

const startMoving = setEvent<ValidKey>();
const stopMoving = setEvent<void>();

const clearAll = setEvent<void>();

// --> Обработчики
export function handleSetWallsRects(svgRects: NodeListOf<SVGRectElement>) {
  const mappedRects = Array.from(svgRects).map((rect, index) => ({
    rect: rect.getBoundingClientRect().toJSON(),
    uniqueId: `wall_${index}`,
  }));

  setWallsDomRects(mappedRects);
}

export function handleSetPlayerInitialInfo(domInfo: DOMRect) {
  setInitialPlayerInfo(mapPlayerInfo(PlayerInfoTemplate, domInfo));
}

export function handleSetMarkersRects(markers: MayBeUnique<DOMRect>[]) {
  setMarkersRefs(markers);
}

export function handleCompleteMarker(id: string) {
  if (MarkersList.includes(id as MarkerTypes)) {
    setMarkerComplete(id as MarkerTypes);
  }
}

export function handleKeyDown(event: KeyboardEvent) {
  event.preventDefault();
  if (isGameReady() && AllowedKeysList.includes(event.code)) {
    const keyCode = event.code as ValidKey;
    const { Up, Right, Down, Left } = AllowedKeys;

    const { direction } = playerCollisionStore.getState();

    startMoving(keyCode);
    if (Up.includes(keyCode)) {
      !direction?.top && moveUp();
    }
    if (Right.includes(keyCode)) {
      !direction?.right && moveRight();
    }
    if (Down.includes(keyCode)) {
      !direction?.bottom && moveDown();
    }
    if (Left.includes(keyCode)) {
      !direction?.left && moveLeft();
    }
  }
}

export function handleKeyUp(event: KeyboardEvent) {
  event.preventDefault();
  stopMoving();
}

function isGameReady() {
  const isWallsSetted = isWallsSettedStore.getState();
  const isUserInfoSetted = playerInfoStore.getState().isInitialInfoSetted;
  const isMarkersSetted = markersRectsStore.getState().length > 0;

  return isWallsSetted && isUserInfoSetted && isMarkersSetted;
}

// --> Сторы.
/** Стор с координатами всех стен. */
export const wallsDomRectsStore = setStore<MayBeUnique<DOMRect>[]>([])
  .on(setWallsDomRects, (_, payload) => payload)
  .clear(clearAll);

/** Стор с информацией об игроке (его позиционирование и размеры). */
const playerInfoStore = setStore<PlayerInfo>(PlayerInfoTemplate)
  .on(setInitialPlayerInfo, (_, payload) => ({ ...payload, isInitialInfoSetted: true }))
  .on(moveUp, info => {
    const yAxisDecrement = info.y - MovementDeltaPx;
    const bottomPosition = yAxisDecrement + info.height;

    return { ...info, y: yAxisDecrement, top: yAxisDecrement, bottom: bottomPosition };
  })
  .on(moveDown, info => {
    const yAxisIncrement = info.y + MovementDeltaPx;
    const bottomPosition = yAxisIncrement + info.height;

    return { ...info, y: yAxisIncrement, top: yAxisIncrement, bottom: bottomPosition };
  })
  .on(moveRight, info => {
    const xAxisIncrement = info.x + MovementDeltaPx;
    const rightPosition = xAxisIncrement + info.width;

    return { ...info, x: xAxisIncrement, left: xAxisIncrement, right: rightPosition };
  })
  .on(moveLeft, info => {
    const xAxisDecrement = info.x - MovementDeltaPx;
    const rightPosition = xAxisDecrement + info.width;

    return { ...info, x: xAxisDecrement, left: xAxisDecrement, right: rightPosition };
  })
  .clear(clearAll);

/** Стор с координатами и информацией о маркерах. */
export const markersRectsStore = setStore<MayBeUnique<DOMRect>[]>([])
  .on(setMarkersRefs, (_, payload) => payload)
  .clear(clearAll);

/** Стор с информацией о маркерах с возможностью доступа по константному времени. */
export const markersIsCompletedStore = setComputedStore({
  store: markersRectsStore,
  transform: markers =>
    markers.reduce((prev: Record<string, CompletableMarker>, curr) => {
      if (curr.uniqueId) {
        prev[curr.uniqueId] = {
          completed: false,
          id: curr.uniqueId as MarkerTypes,
        };
      }

      return prev;
    }, {}),
}).on(setMarkerComplete, (markers, payload) => {
  return { ...markers, [payload]: { id: payload, completed: true } };
});

/** Стор, содержайщий последнюю нажатую кнопку. */
const currentKeyStore = setStore<ValidKey>(ArrowKeys.ArrowUp)
  .on(startMoving, (_, payload) => payload)
  .clear(clearAll);

/**
 * Стор, содержащий информацию о коллизиях игрока с предметами.
 * --> Отправляет сигнал с id предметом столкновения.
 * */
const playerCollisionStore = setComputedStore({
  store: playerInfoStore,
  transform: playerInfo => {
    const walls = wallsDomRectsStore.getState();
    const markers = markersRectsStore.getState();

    return new CollisionDetector(walls, markers).detectCollision(playerInfo);
  },
}).watch(({ object }) => {
  if (object?.uniqueId) {
    signal.send(object.uniqueId);
    handleCompleteMarker(object.uniqueId);
  }
});

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
  transform: key => MapMoveStylesByKey[key],
});

/** Вычисляемый стор, содержащий стиль с позиционированием игрока. */
export const playerStyleStore = setComputedStore({
  store: playerInfoStore,
  transform: info => (info.isInitialInfoSetted ? { top: `${info.top}px`, left: `${info.left}px` } : {}),
});
