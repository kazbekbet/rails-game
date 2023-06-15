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
  ShiftSpeedPx,
  LetterKeys,
  AccelerationKeys,
  ShiftKeys,
} from '../constants';
import { MarkerTypes, PlayerInfo, MayBeUnique, CompletableMarker } from '../interfaces';
import { mapPlayerInfo } from '../utils/map-player-info';
import { CollisionDetector } from '../utils/physics';
import { MarkersId } from '@api/signals';

export type HtmlGameModel = ReturnType<typeof createModel>;

export function createModel() {
  const markersSignal = MarkersId.use();

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
  function handleSetWallsRects(svgRects: NodeListOf<SVGRectElement>) {
    const mappedRects = Array.from(svgRects).map((rect, index) => ({
      rect: rect.getBoundingClientRect().toJSON(),
      uniqueId: `wall_${index}`,
    }));

    setWallsDomRects(mappedRects);
  }

  function handleSetPlayerInitialInfo(domInfo: DOMRect) {
    setInitialPlayerInfo(mapPlayerInfo(PlayerInfoTemplate, domInfo));
  }

  function handleSetMarkersRects(markers: MayBeUnique<DOMRect>[]) {
    setMarkersRefs(markers);
  }

  function handleCompleteMarker(id: string) {
    if (MarkersList.has(id as MarkerTypes)) {
      setMarkerComplete(id as MarkerTypes);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    if (isGameReady()) {
      if (AllowedKeysList.has(event.code as ValidKey)) {
        const keyCode = event.code as ValidKey;

        startMoving(keyCode);
        playerMovingMapper(keyCode, event.shiftKey);
        return;
      }

      if (AccelerationKeys.has(event.code as ShiftKeys)) {
        const keyCode = event.code as ValidKey;
        const lastMovingKey = currentKeyStore.getState();

        if (lastMovingKey) {
          startMoving(lastMovingKey);
          playerMovingMapper(lastMovingKey, true);
        }
        return;
      }
    }
  }

  /** Маппит возвожные пути перемещения в зависимости от кнопки. */
  function playerMovingMapper(key: ValidKey, isAccelerationNeeded: boolean) {
    const { Up, Right, Down, Left } = AllowedKeys;

    if (Up.has(key)) {
      handleMove({ moveFn: moveUp, isAccelerationNeeded, stopDirection: 'top' });
    }
    if (Right.has(key)) {
      handleMove({ moveFn: moveRight, isAccelerationNeeded, stopDirection: 'right' });
    }
    if (Down.has(key)) {
      handleMove({ moveFn: moveDown, isAccelerationNeeded, stopDirection: 'bottom' });
    }
    if (Left.has(key)) {
      handleMove({ moveFn: moveLeft, isAccelerationNeeded, stopDirection: 'left' });
    }
  }

  function handleMove({
    moveFn,
    isAccelerationNeeded,
    stopDirection,
  }: {
    moveFn: Function;
    isAccelerationNeeded: boolean;
    stopDirection: 'top' | 'right' | 'bottom' | 'left';
  }) {
    if (isAccelerationNeeded) {
      for (let i = 0; i < ShiftSpeedPx; i++) {
        const { direction } = playerCollisionStore.getState();

        if (direction?.[stopDirection]) break;
        moveFn();
      }
    } else {
      const { direction } = playerCollisionStore.getState();
      if (!direction?.[stopDirection]) moveFn();
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
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
  const wallsDomRectsStore = setStore<MayBeUnique<DOMRect>[]>([])
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
  const markersRectsStore = setStore<MayBeUnique<DOMRect>[]>([])
    .on(setMarkersRefs, (_, payload) => payload)
    .clear(clearAll);

  /** Стор с информацией о маркерах с возможностью доступа по константному времени. */
  const markersIsCompletedStore = setComputedStore({
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
  const currentKeyStore = setStore<ValidKey | null>(ArrowKeys.ArrowUp)
    .on(startMoving, (_, payload) => payload)
    .on(stopMoving, _ => null)
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
      markersSignal.send(object.uniqueId);
      handleCompleteMarker(object.uniqueId);
    }
  });

  /** Вспомогательный стор, отвечающий на вопрос двигается ли игрок в данный момент. */
  const isPlayerMovingStore = setStore(false)
    .on(startMoving, () => true)
    .on(stopMoving, () => false)
    .clear(clearAll);

  /** Вспомогательный стор, отвечающий на вопрос получены ли координаты всех стен. */
  const isWallsSettedStore = setComputedStore({
    store: wallsDomRectsStore,
    transform: value => value.length > 0,
  });

  /** Вычисляемый стор, содержащий текущий css класс, соответствующий направлению игрока. */
  const moveCssClassStore = setComputedStore({
    store: currentKeyStore,
    condition: key => Boolean(key),
    transform: key => (key ? MapMoveStylesByKey[key] : ArrowKeys.ArrowUp),
  });

  /** Вычисляемый стор, содержащий стиль с позиционированием игрока. */
  const playerStyleStore = setComputedStore({
    store: playerInfoStore,
    transform: info => (info.isInitialInfoSetted ? { top: `${info.top}px`, left: `${info.left}px` } : {}),
  });

  return {
    handleSetWallsRects,
    handleSetPlayerInitialInfo,
    handleSetMarkersRects,
    handleCompleteMarker,
    handleKeyDown,
    handleKeyUp,
    wallsDomRectsStore,
    markersRectsStore,
    markersIsCompletedStore,
    isPlayerMovingStore,
    isWallsSettedStore,
    moveCssClassStore,
    playerStyleStore,
  };
}
