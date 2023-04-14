import { MarkerRectMap, PlayerInfo } from '@entities/html-game/interfaces';

export class CollisionDetector {
  constructor(private walls: DOMRect[], private markerRects: MarkerRectMap) {}

  public detectCollision(player: PlayerInfo) {
    const obstacles = this.getObstacles();

    for (const obstacle of obstacles) {
      if (this.getIsOverlapped(player, obstacle) && this.getIsOverlapped(obstacle, player)) {
        return {
          object: obstacle,
          direction: this.getDirection(player, obstacle),
          isCollided: true,
        };
      }
    }

    // --> Коллизия не найдена, возвращаем темплейт.
    return {
      object: null,
      direction: null,
      isCollided: false,
    };
  }

  private getIsOverlapped(first: DOMRect, second: DOMRect) {
    return first.left <= second.right && first.top <= second.bottom;
  }

  private getDirection(p: DOMRect, o: DOMRect) {
    return {
      top: o.top <= p.top && o.bottom < p.bottom,
      bottom: o.bottom >= p.bottom && o.top > p.top,
      left: o.left <= p.left && o.right < p.right,
      right: o.right >= p.right && o.left > p.left,
    };
  }

  private getObstacles(): DOMRect[] {
    return [...this.walls, ...Array.from(this.markerRects.values())];
  }
}
