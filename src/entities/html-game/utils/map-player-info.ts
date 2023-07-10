import { PlayerInfo } from '../interfaces';

export function mapPlayerInfo(template: PlayerInfo, domInfo: DOMRect): PlayerInfo {
  const newPlayerObject = {
    ...template,
    ...domInfo,
    toJSON: () => ({ ...newPlayerObject }),
  };

  return newPlayerObject;
}
