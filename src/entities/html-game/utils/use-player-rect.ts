import { RefObject, useEffect } from 'react';

interface Props {
  onSetRects: (rect: DOMRect) => unknown;
  playerRef: RefObject<HTMLObjectElement>;
}

export function usePlayerRect({ onSetRects, playerRef }: Props) {
  useEffect(() => {
    if (playerRef.current) {
      onSetRects(playerRef.current.getBoundingClientRect());
    }
  }, [playerRef.current]);
}
