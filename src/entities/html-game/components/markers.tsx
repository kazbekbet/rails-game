import mainMarker from '@assets/markers/main.svg';
import classNames from 'classnames';
import styles from '../styles/html-game.module.scss';
import { RefObject, useRef } from 'react';
import { useMarkersRect } from '@entities/html-game/utils/use-markers-rect';
import { MarkerTypes } from '@entities/html-game/interfaces';
import * as model from '../model';
import { useStore } from 're-event';
import { Marker } from '@entities/html-game/components/marker';

interface Props {
  showTemplate?: boolean;
}

export function Markers({ showTemplate }: Props) {
  const hrRef = useRef<HTMLObjectElement>(null);
  const omRef = useRef<HTMLObjectElement>(null);
  const swRef = useRef<HTMLObjectElement>(null);
  const pmoRef = useRef<HTMLObjectElement>(null);
  const backRef = useRef<HTMLObjectElement>(null);
  const testRef = useRef<HTMLObjectElement>(null);
  const analystRef = useRef<HTMLObjectElement>(null);

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
      className: markersClass.female,
      style: { top: '589px', left: '1038px', rotate: '' },
    },
    {
      id: MarkerTypes.Om,
      ref: omRef,
      className: markersClass.female,
      style: { top: '82px', left: '298px', rotate: '180deg' },
    },
    {
      id: MarkerTypes.Sw,
      ref: swRef,
      className: markersClass.male,
      style: { top: '67px', left: '1121px', rotate: '270deg' },
    },
    {
      id: MarkerTypes.Pmo,
      ref: pmoRef,
      className: markersClass.female,
      style: { top: '325px', left: '880px', rotate: '180deg' },
    },
    {
      id: MarkerTypes.Back,
      ref: backRef,
      className: markersClass.female,
      style: { top: '423px', left: '643px', rotate: '270deg' },
    },
    {
      id: MarkerTypes.Test,
      ref: testRef,
      className: markersClass.male,
      style: { top: '82px', left: '633px', rotate: '180deg' },
    },
    {
      id: MarkerTypes.Analyst,
      ref: analystRef,
      className: markersClass.female,
      style: { top: '212px', left: '1016px', rotate: '90deg' },
    },
  ];

  return (
    <>
      {markers.map(({ id, ref, className, style }) => (
        <Marker key={id} id={id} className={className} ref={ref} style={style} />
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

const markersClass = {
  male: classNames(styles.marker, styles.male),
  female: classNames(styles.marker, styles.female),
};
