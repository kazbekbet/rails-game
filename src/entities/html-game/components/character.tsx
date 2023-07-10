import * as model from '../model';
import { MarkerTypes } from '@entities/html-game';
import { CSSProperties, ForwardedRef, forwardRef, memo, RefObject } from 'react';
import { useStore } from 're-event';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';
import { HtmlGameModel } from '../model';
import { ImageTypes, Obstacle } from '../interfaces';
import { ClassNamesForType } from '../constants';
import { MapObject } from './map-object';

interface Props {
  model: HtmlGameModel;
  obstacle: Obstacle<DOMRect>;
}

export const Character = forwardRef(({ model, obstacle }: Props, ref: ForwardedRef<HTMLObjectElement>) => {
  //TODO: поработать над ререндерами.
  const markersCompletedInfo = useStore(model.markersIsCompletedStore);
  const type = obstacle.data?.imageType ?? ImageTypes.Woman;
  const getClassName = markersCompletedInfo[obstacle.uniqueId ?? 1]?.completed
    ? () => classNames(ClassNamesForType[type], styles.completed)
    : () => ClassNamesForType[type];

  return <MapObject {...obstacle} className={getClassName()} />;
});
