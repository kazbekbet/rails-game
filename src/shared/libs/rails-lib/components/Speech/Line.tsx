import React, { useMemo, useRef, useState } from 'react';
import { SPEECH_ANIMATION_TIME } from './constants';
import { DialogLine } from './styled';
import { useLineAnimation } from './use-line-animation';

type TProps = {
  children: string;
  delay?: number;
  time?: number;
  hasBlink?: boolean;
};

/**
 * Компонент анимированной речи для диалога.
 * В качестве дочернего элемента принимает только строку, длину строки для стилей рассчитывает автоматически.
 * Позволяет отсрочить появление текста на `delay` секунд.
 */
export const Line: React.FC<TProps> = ({ children, hasBlink, delay = 0, time = SPEECH_ANIMATION_TIME }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(!delay);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useLineAnimation(isVisible, lineRef, children, () => setIsAnimationFinished(true));

  React.useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, []);

  const isShowBlink = useMemo(() => !!hasBlink && isAnimationFinished, [hasBlink, isAnimationFinished]);

  return <DialogLine ref={lineRef} hasBlink={isShowBlink}></DialogLine>;
};
