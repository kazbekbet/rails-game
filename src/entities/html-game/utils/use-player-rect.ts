import { RefObject, useEffect } from 'react';

interface Props {
  onSetRects: (rect: SVGRectElement) => unknown;
  playerRef: RefObject<HTMLObjectElement>;
}

export function usePlayerRect({ onSetRects, playerRef }: Props) {
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.onload = () => {
        const rect = playerRef.current?.contentDocument?.querySelectorAll('rect')[0]!;
        rect && onSetRects(rect);
      };
    }
  }, [playerRef.current]);

}
