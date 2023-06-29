import { PlayerInfo, Obstacle } from '@entities/html-game/interfaces';

export class CollisionDetector {
  constructor(private obstacles: Obstacle<DOMRect>[]) {}

  public detectCollision(player: PlayerInfo) {
    const normalizedPlayer = this.normalize(player);

    for (const obstacle of this.obstacles) {
      if (this.getIsOverlapped(normalizedPlayer, obstacle) && this.getIsOverlapped(obstacle, normalizedPlayer)) {
        return {
          object: obstacle,
          // --> Если объект можно пройти насквозь, то direction в данном случае не нужен.
          direction: !obstacle.isThroughElement ? this.getDirection(normalizedPlayer, obstacle) : null,
        };
      }
    }

    // --> Коллизия не найдена, возвращаем темплейт.
    return {
      object: null,
      direction: null,
    };
  }

  private getIsOverlapped(first: Obstacle<DOMRect>, second: Obstacle<DOMRect>) {
    return first.rect.left <= second.rect.right && first.rect.top <= second.rect.bottom;
  }

  private getDirection(p: Obstacle<DOMRect>, o: Obstacle<DOMRect>) {
    return {
      top: o.rect.top <= p.rect.top && o.rect.bottom < p.rect.bottom,
      bottom: o.rect.bottom >= p.rect.bottom && o.rect.top > p.rect.top,
      left: o.rect.left <= p.rect.left && o.rect.right < p.rect.right,
      right: o.rect.right >= p.rect.right && o.rect.left > p.rect.left,
    };
  }

  private normalize<T>(value: T): Obstacle<T> {
    return { rect: value };
  }
}
