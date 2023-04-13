import React from 'react';
import { Line } from './Line';
import { SPEECH_ANIMATION_TIME } from './constants';

type TProps = {
  children: string[];
  delay?: number;
  time?: number;
};

/**
 * Компонент анимированной речи для диалога.
 * Необходим для работы с несколькими компонентами <Line />: оптимизирует их за счет автоматического расчета `delay`.
 * Свойство `delay` работает в качестве свойства `delay` первого <Line />.
 * Свойство `time` будет одинаково применено ко всем <Line />.
 */
export const Speech = React.memo<TProps>(({ children, delay = 0, time = SPEECH_ANIMATION_TIME }) => {
  const lineDelay = React.useRef<number>(-time + delay);

  return (
    <>
      {
        children.map((line, i, { length }) => (
          <Line
            key={line}
            delay={lineDelay.current += time}
            time={time}
            hasBlink={i === length - 1}
          >
            {line}
          </Line>
        ))
      }
    </>
  );
});
