import mainMarker from '@assets/markers/main.svg';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';
import { useRef } from 'react';
import { useMarkersRect } from '@entities/html-game/utils/use-markers-rect';
import { MarkerTypes } from '@entities/html-game/interfaces';
import * as model from '../model';

export function Markers() {
  const hrRef = useRef<HTMLImageElement>(null);
  const marketingRef = useRef<HTMLImageElement>(null);
  const swRef = useRef<HTMLImageElement>(null);
  const teamleadRef = useRef<HTMLImageElement>(null);

  useMarkersRect({
    refs: {
      [MarkerTypes.Hr]: hrRef,
      [MarkerTypes.Marketing]: marketingRef,
      [MarkerTypes.Sw]: swRef,
      [MarkerTypes.Teamlead]: teamleadRef,
    },
    onSetRects: model.handleSetMarkersRects,
  });

  const markers = [
    {
      id: MarkerTypes.Hr,
      ref: hrRef,
      className: classNames(styles.marker, styles.marker1),
    },
    {
      id: MarkerTypes.Marketing,
      ref: marketingRef,
      className: classNames(styles.marker, styles.marker2),
    },
    {
      id: MarkerTypes.Sw,
      ref: swRef,
      className: classNames(styles.marker, styles.marker3),
    },
    {
      id: MarkerTypes.Teamlead,
      ref: teamleadRef,
      className: classNames(styles.marker, styles.marker4),
    },
  ];

  return (
    <>
      {markers.map(({ id, ref, className }) => (
        <img key={id} ref={ref} className={className} src={mainMarker} />
      ))}
    </>
  );
}
