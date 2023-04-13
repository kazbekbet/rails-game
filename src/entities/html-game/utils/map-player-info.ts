import { PlayerInfo } from '../interfaces';

export function mapPlayerInfo(template: PlayerInfo, domInfo: DOMRect) {
  return {
    x: domInfo.x,
    bottom: domInfo.bottom,
    height: domInfo.height,
    left: domInfo.left,
    right: domInfo.right,
    top: domInfo.top,
    width: domInfo.width,
    y: domInfo.y,
    isInitialInfoSetted: false,
  };
}
