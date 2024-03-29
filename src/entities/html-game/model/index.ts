import { setComputedStore, setEvent, setStore } from 're-event-flow';
import {
  AccelerationKeys,
  ActionsByActionKeys,
  AllowedActionKeys,
  AllowedKeys,
  AllowedKeysList,
  ArrowKeys,
  CoinsCollectSound,
  ControllKeys,
  MapMoveStylesByKey,
  MarkersList,
  MovementDeltaPx,
  PlayerInfoTemplate,
  ShiftKeys,
  ShiftSpeedPx,
  ValidKey,
  itemsInInventory,
  mapModalIdToItem,
} from '../constants';
import { CompletableMarker, PlayerEquipment, MarkerTypes, Obstacle, ObstacleTypes, PlayerInfo } from '../interfaces';
import { mapPlayerInfo } from '../utils/map-player-info';
import { CollisionDetector } from '../utils/physics';
import { CoinsCollectNotifier, MarkersId, PlayerInputAction } from '@api/signals';

export type HtmlGameModel = ReturnType<typeof createModel>;

export function createModel() {
  const markersSignal = MarkersId.use();
  const coinsCollectSignal = CoinsCollectNotifier.use();
  const playerInputActionSignal = PlayerInputAction.use();

  // --> События.
  const openModal = setEvent<string>();
  const setWallsDomRects = setEvent<Obstacle<DOMRect>[]>();
  const setCoinsDomRects = setEvent<Obstacle<DOMRect>[]>();
  const setCharactersDomRects = setEvent<Obstacle<DOMRect>[]>();
  const setInitialPlayerInfo = setEvent<PlayerInfo>();
  const setMarkersRefs = setEvent<Obstacle<DOMRect>[]>();
  const setMarkerComplete = setEvent<MarkerTypes>();
  const setIsOpenInventoryModal = setEvent<boolean>();
  const toggleOpenInventoryModal = setEvent<void>();

  const moveUp = setEvent<void>();
  const moveRight = setEvent<void>();
  const moveDown = setEvent<void>();
  const moveLeft = setEvent<void>();

  const startMoving = setEvent<ValidKey>();
  const stopMoving = setEvent<void>();

  const collectCoin = setEvent<string>();
  const clearAll = setEvent<void>();

  markersSignal.store.watch(openModal);

  // --> Обработчики
  function handleSetWallsRects(svgRects: NodeListOf<SVGRectElement>) {
    const mappedRects: Obstacle<DOMRect>[] = Array.from(svgRects).map((rect, index) => ({
      rect: rect.getBoundingClientRect().toJSON(),
      uniqueId: `wall_${index}`,
      type: ObstacleTypes.Wall,
    }));

    setWallsDomRects(mappedRects);
  }

  function handleSetCoinsRects(svgRects: NodeListOf<SVGRectElement>) {
    const mappedRects: Obstacle<DOMRect>[] = Array.from(svgRects).map((rect, index) => ({
      rect: rect.getBoundingClientRect().toJSON(),
      uniqueId: `coin_${index}`,
      isThroughElement: true,
      type: ObstacleTypes.Coin,
      collectable: {
        show: true,
      },
    }));

    setCoinsDomRects(mappedRects);
  }

  function handleSetCharactersRects(svgRects: NodeListOf<SVGRectElement>) {
    const mappedRects = Array.from(svgRects).map((rect, index) => {
      return {
        rect: rect.getBoundingClientRect().toJSON(),
        uniqueId: rect.id.length ? rect.id : index.toString(),
        isThroughElement: false,
        type: (rect.dataset.type as ObstacleTypes) ?? ObstacleTypes.Marker,
        data: rect.dataset,
      };
    });

    setCharactersDomRects(mappedRects);
  }

  function handleSetPlayerInitialInfo(svgRect: SVGRectElement) {
    setInitialPlayerInfo(mapPlayerInfo(PlayerInfoTemplate, svgRect.getBoundingClientRect().toJSON()));
  }

  function handleSetMarkersRects(markers: Obstacle<DOMRect>[]) {
    setMarkersRefs(markers);
  }

  function handleCompleteMarker(id: string) {
    if (MarkersList.has(id as MarkerTypes)) {
      setMarkerComplete(id as MarkerTypes);
    }
  }

  function handleCheckCollidedObstacle(obstacle: Obstacle<DOMRect> | null) {
    if (obstacle && obstacle.uniqueId && obstacle.type) {
      if (obstacle.type === ObstacleTypes.Marker) {
        markersSignal.send(obstacle.uniqueId);
        handleCompleteMarker(obstacle.uniqueId);
      }

      if (obstacle.type === ObstacleTypes.Coin && obstacle.collectable?.show) {
        CoinsCollectSound.play();
        collectCoin(obstacle.uniqueId);
        coinsCollectSignal.send(1);
      }
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

      if (AllowedActionKeys.has(event.code as ControllKeys)) {
        playerInputActionSignal.send(ActionsByActionKeys[event.code as ControllKeys]);
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

  playerInputActionSignal.store.watch(val => {
    if (val === 'inventory') {
      toggleOpenInventoryModal();
    }
  });

  //* Вызывается при выборе предмета в инвентаре*/
  function handleUseItemFromInventory(item: PlayerEquipment) {}

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
    const isPlayerSetted = isPlayerSettedStore.getState();
    const isWallsSetted = isWallsSettedStore.getState();
    const isCoinsSetted = isCoinsSettedStore.getState();
    const isUserInfoSetted = playerInfoStore.getState().isInitialInfoSetted;
    const isCharactersSetted = isCharactersSetteledStore.getState();

    return ![isPlayerSetted, isWallsSetted, isCoinsSetted, isUserInfoSetted, isCharactersSetted].includes(false);
  }

  // --> Сторы.
  /** Стор с координатами всех стен. */
  const wallsDomRectsStore = setStore<Obstacle<DOMRect>[]>([])
    .on(setWallsDomRects, (_, payload) => payload)
    .clear(clearAll);

  const coinsDomRectsStore = setStore<Obstacle<DOMRect>[]>([])
    .on(setCoinsDomRects, (_, payload) => payload)
    .on(collectCoin, (coins, coinId) => {
      const coinIndex = coins.findIndex(coin => coin.uniqueId === coinId);
      if (coinIndex > -1) {
        const copiedCoins = [...coins];
        const coin = copiedCoins[coinIndex] as Obstacle<DOMRect>;
        coin.collectable!.show = false;

        return copiedCoins;
      }

      return coins;
    })
    .clear(clearAll);

  const charactersDomRectsStore = setStore<Obstacle<DOMRect>[]>([])
    .on(setCharactersDomRects, (_, payload) => payload)
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

  /** Стор с информацией о маркерах с возможностью доступа по константному времени. */
  const markersIsCompletedStore = setComputedStore({
    store: charactersDomRectsStore,
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

  const isOpenInventoryModal = setStore<boolean>(false)
    .on(setIsOpenInventoryModal, (_, payload) => payload)
    .on(toggleOpenInventoryModal, value => !value);

  /** Вызывается при открытии модальных окон, по id модального окна определяет какой предмет нужно добавить в инвентарь */
  const currentUserInventory = setStore<PlayerEquipment[]>([]).on(openModal, (value, payload) => {
    const itemKeyFromModal = mapModalIdToItem[payload];
    if (!itemKeyFromModal) {
      return value;
    }

    const itemForAddToInventory = itemsInInventory[itemKeyFromModal];

    if (value.includes(itemForAddToInventory)) {
      return value;
    }

    return [itemsInInventory[itemKeyFromModal], ...value];
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
      const coins = coinsDomRectsStore.getState();
      const markers = charactersDomRectsStore.getState();

      return new CollisionDetector([...walls, ...coins, ...markers]).detectCollision(playerInfo);
    },
  }).watch(({ object }) => handleCheckCollidedObstacle(object));

  /** Вспомогательный стор, отвечающий на вопрос получены ли первоначальные координаты. */
  const isPlayerSettedStore = setComputedStore({
    store: playerInfoStore,
    transform: store => store.x !== -100 && store.y !== -100,
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

  /** Вспомогательный стор, отвечающий на вопрос получены ли координаты всех монет на карте. */
  const isCoinsSettedStore = setComputedStore({
    store: coinsDomRectsStore,
    transform: value => value.length > 0,
  });

  const isCharactersSetteledStore = setComputedStore({
    store: charactersDomRectsStore,
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
    transform: info =>
      info.isInitialInfoSetted
        ? { top: `${info.top}px`, left: `${info.left}px`, width: `${info.width}px`, height: `${info.height}px` }
        : {},
  });

  return {
    handleSetWallsRects,
    handleSetCoinsRects,
    handleSetCharactersRects,
    handleSetPlayerInitialInfo,
    handleSetMarkersRects,
    handleCompleteMarker,
    handleKeyDown,
    handleKeyUp,
    setIsOpenInventoryModal,
    wallsDomRectsStore,
    coinsDomRectsStore,
    markersIsCompletedStore,
    isPlayerSettedStore,
    isPlayerMovingStore,
    isWallsSettedStore,
    isCoinsSettedStore,
    isCharactersSetteledStore,
    charactersDomRectsStore,
    moveCssClassStore,
    playerStyleStore,
    handleUseItemFromInventory,
    currentUserInventory,
    isOpenInventoryModal,
  };
}
