import React from 'react';
import { SPEECH_ANIMATION_TIME } from './constants';
import { Blink, DialogLine } from './styled';

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

  React.useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, []);

  return isVisible
    ? (
      <DialogLine length={hasBlink ? children.length + 1 : children.length} time={time}>
        {children}
        {
          hasBlink
            ? <Blink />
            : null
        }
      </DialogLine>
    )
    : null;
};
