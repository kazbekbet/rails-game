import { PlayerInfo, MayBeUnique } from '@entities/html-game/interfaces';

export class CollisionDetector {
  constructor(private walls: MayBeUnique<DOMRect>[], private markerRects: MayBeUnique<DOMRect>[]) {}

  public detectCollision(player: PlayerInfo) {
    const normalizedPlayer = this.normalize(player);
    const obstacles = this.getObstacles();

    for (const obstacle of obstacles) {
      if (this.getIsOverlapped(normalizedPlayer, obstacle) && this.getIsOverlapped(obstacle, normalizedPlayer)) {
        return {
          object: obstacle,
          direction: this.getDirection(normalizedPlayer, obstacle),
        };
      }
    }

    // --> Коллизия не найдена, возвращаем темплейт.
    return {
      object: null,
      direction: null,
    };
  }

  private getIsOverlapped(first: MayBeUnique<DOMRect>, second: MayBeUnique<DOMRect>) {
    return first.rect.left <= second.rect.right && first.rect.top <= second.rect.bottom;
  }

  private getDirection(p: MayBeUnique<DOMRect>, o: MayBeUnique<DOMRect>) {
    return {
      top: o.rect.top <= p.rect.top && o.rect.bottom < p.rect.bottom,
      bottom: o.rect.bottom >= p.rect.bottom && o.rect.top > p.rect.top,
      left: o.rect.left <= p.rect.left && o.rect.right < p.rect.right,
      right: o.rect.right >= p.rect.right && o.rect.left > p.rect.left,
    };
  }

  private getObstacles(): MayBeUnique<DOMRect>[] {
    return [...this.walls, ...Array.from(this.markerRects.values())];
  }

  private normalize<T>(value: T): MayBeUnique<T> {
    return { rect: value };
  }
}
