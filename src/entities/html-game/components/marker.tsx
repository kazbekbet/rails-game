import * as model from '../model';
import { MarkerTypes } from '@entities/html-game';
import { CSSProperties, ForwardedRef, forwardRef, memo, RefObject } from 'react';
import { useStore } from 're-event';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';

interface Props {
  id: MarkerTypes;
  className: string;
  style: CSSProperties;
  ref: RefObject<HTMLImageElement>;
}

export const Marker = forwardRef(
  ({ id, className, style }: Props, ref: ForwardedRef<HTMLObjectElement>) => {
    //TODO: поработать над ререндерами.
    const markersCompletedInfo = useStore(model.markersIsCompletedStore);
    const getClassName = markersCompletedInfo[id]?.completed
      ? () => classNames(className, styles.completed)
      : () => className;

    return <div key={id} id={id} className={getClassName()} ref={ref} style={style} />;
  }
);
