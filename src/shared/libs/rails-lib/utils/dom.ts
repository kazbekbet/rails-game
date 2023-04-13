
/**
 * Возвращает массив препятствий, через которые игрок не может пройти.
 */
export const getObstacles = (wallsMap: HTMLObjectElement, markers: HTMLCollection) => [
  // TODO: поправить типы
  // @ts-expect-error
  ...markers,
  // @ts-expect-error
  ...(wallsMap.contentDocument?.querySelector('svg')?.querySelectorAll('rect') ?? []),
].filter(({ nodeName }) => ['rect', 'IMG'].includes(nodeName));
