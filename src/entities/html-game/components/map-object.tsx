import { memo } from 'react';
import coin from '@assets/coin.svg';
import { Obstacle } from '../interfaces';
import { ImageForType } from '../constants';
import { getStylesFromData } from '@shared/helpers/transoform-helpers';

interface IMapObject extends Obstacle<DOMRect> {
  className: string;
}

export const MapObject = memo((props: IMapObject) => {
  const { data, uniqueId, rect, className } = props;
  if (!data?.imageType) {
    return null;
  }

  return (
    <img
      className={className}
      key={uniqueId}
      src={ImageForType[data.imageType]}
      style={{ position: 'absolute', ...rect, ...getStylesFromData(data?.style) }}
    />
  );
});
