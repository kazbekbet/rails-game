import { useEffect } from 'react';
import { secondsToMilliseconds } from '../../utils';
import { ERROR_RATE_FOR_CHAR, SPEECH_ANIMATION_TIME, MAX_TIME_TO_RENDER_CHAR } from './constants';

export const useLineAnimation = (
  isVisible: boolean,
  lineRef: React.RefObject<HTMLDivElement>,
  textToDisplay: string,
  onFinish: () => void
) => {
  useEffect(() => {
    if (isVisible && lineRef.current) {
      const ERROR_RATE = ERROR_RATE_FOR_CHAR * textToDisplay.length;
      const calculatedTimeToAddChar =
        (secondsToMilliseconds(SPEECH_ANIMATION_TIME) - ERROR_RATE) / textToDisplay.length;
      console.log(calculatedTimeToAddChar);
      const TIME_TO_ADD_CHAR =
        calculatedTimeToAddChar > MAX_TIME_TO_RENDER_CHAR ? MAX_TIME_TO_RENDER_CHAR : calculatedTimeToAddChar;
      let prevRenderTime = 0;
      let indexToDisplay = 0;

      requestAnimationFrame(function animateLineText(time) {
        if (time - prevRenderTime >= TIME_TO_ADD_CHAR) {
          lineRef.current!.textContent = textToDisplay.slice(0, ++indexToDisplay);
          prevRenderTime = time;
        }
        if (prevRenderTime === 0) {
          prevRenderTime = time;
        }

        if (indexToDisplay < textToDisplay.length) {
          requestAnimationFrame(animateLineText);
        } else {
          onFinish();
        }
      });
    }
  }, [isVisible]);
};
