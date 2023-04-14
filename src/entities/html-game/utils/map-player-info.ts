import { PlayerInfo } from '../interfaces';

export function mapPlayerInfo(template: PlayerInfo, domInfo: DOMRect): PlayerInfo {
  const domInfoJSON = domInfo.toJSON();
  const newPlayerObject = {
    ...template,
    ...domInfoJSON,
    toJSON: () => ({ ...newPlayerObject }),
  };

  return newPlayerObject;
}
