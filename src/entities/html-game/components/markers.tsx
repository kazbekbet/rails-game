import mainMarker from '@assets/markers/main.svg';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';
import { RefObject, useRef } from 'react';
import { useMarkersRect } from '@entities/html-game/utils/use-markers-rect';
import { MarkerTypes } from '@entities/html-game/interfaces';
import * as model from '../model';
import { useStore } from 're-event';

interface Props {
  showTemplate?: boolean;
}

export function Markers({ showTemplate }: Props) {
  const hrRef = useRef<HTMLImageElement>(null);
  const omRef = useRef<HTMLImageElement>(null);
  const swRef = useRef<HTMLImageElement>(null);
  const pmoRef = useRef<HTMLImageElement>(null);
  const backRef = useRef<HTMLImageElement>(null);
  const testRef = useRef<HTMLImageElement>(null);
  const analystRef = useRef<HTMLImageElement>(null);

  useMarkersRect({
    refs: {
      [MarkerTypes.Hr]: hrRef,
      [MarkerTypes.Om]: omRef,
      [MarkerTypes.Sw]: swRef,
      [MarkerTypes.Pmo]: pmoRef,
      [MarkerTypes.Back]: backRef,
      [MarkerTypes.Test]: testRef,
      [MarkerTypes.Analyst]: analystRef,
    },
    onSetRects: model.handleSetMarkersRects,
  });

  const markers = [
    {
      id: MarkerTypes.Hr,
      ref: hrRef,
      className: styles.marker,
      position: { top: '548px', left: '1038px' },
    },
    {
      id: MarkerTypes.Om,
      ref: omRef,
      className: styles.marker,
      position: { top: '77px', left: '278px' },
    },
    {
      id: MarkerTypes.Sw,
      ref: swRef,
      className: styles.marker,
      position: { top: '67px', left: '1121px' },
    },
    {
      id: MarkerTypes.Pmo,
      ref: pmoRef,
      className: styles.marker,
      position: { top: '321px', left: '866px' },
    },
    {
      id: MarkerTypes.Back,
      ref: backRef,
      className: styles.marker,
      position: { top: '417px', left: '632px' },
    },
    {
      id: MarkerTypes.Test,
      ref: testRef,
      className: styles.marker,
      position: { top: '77px', left: '615px' },
    },
    {
      id: MarkerTypes.Analyst,
      ref: analystRef,
      className: styles.marker,
      position: { top: '204px', left: '1010px' },
    },
  ];

  return (
    <>
      {markers.map(({ id, ref, className, position }) => (
        <img id={id} key={id} ref={ref} className={className} style={{ ...position }} src={mainMarker} />
      ))}
      {showTemplate && <MarkersTemplate />}
    </>
  );
}

export function MarkersTemplate() {
  const markersRects = useStore(model.markersRectsStore);

  return (
    <>
      {markersRects.map(({ rect, uniqueId }, index) => {
        return (
          <div
            key={uniqueId ?? index}
            style={{
              backgroundColor: 'green',
              position: 'absolute',
              width: rect.width,
              top: rect.top,
              left: rect.left,
              height: rect.height,
            }}
          />
        );
      })}
    </>
  );
}
