const getIsOverlapped = ({ left, top }: DOMRect, { bottom, right }: DOMRect) => left <= right && top <= bottom;

/**
 * Позволяет высчитать, в каком направлении относительно игрока произошло столкновение.
 *
 * @param {DOMRect} p - `getBoundingClientRect()` игрока.
 * @param {DOMRect} o - `getBoundingClientRect()` объекта.
 *
 * @returns Объект, содержащий признаки направления столкновения.
 */
export const getDirection = (p: DOMRect, o: DOMRect) => ({
  top: o.top <= p.top && o.bottom < p.bottom,
  bottom: o.bottom >= p.bottom && o.top > p.top,
  left: o.left <= p.left && o.right < p.right,
  right: o.right >= p.right && o.left > p.left,
});

/**
 * Фабрика, создающая функцию для расчёта столкновения и геттер объекта, с которым оно произошло.
 */
const createDetectCollision = () => {
  let collidedObj: HTMLElement | undefined;
  let objectBox: DOMRect;

  return [
    (player: HTMLElement, objects: HTMLElement[]) => {
      const playerBox = player.getBoundingClientRect();

      collidedObj = objects.find((object: HTMLElement) => {
        objectBox = object.getBoundingClientRect();

        return getIsOverlapped(playerBox, objectBox) && getIsOverlapped(objectBox, playerBox);
      });

      if (collidedObj) {
        return getDirection(playerBox, objectBox);
      }
    },
    () => collidedObj,
  ];
};

export const secondsToMilliseconds = (seconds: number) => {
  if (!seconds) {
    return 0;
  }

  return seconds * 1000;
};

export const [detectCollision, getObject] = createDetectCollision();
