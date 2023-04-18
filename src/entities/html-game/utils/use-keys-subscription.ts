import { Ref, RefObject, useEffect } from 'react';

interface Props {
  onKeyDown: (event: KeyboardEvent) => unknown;
  onKeyUp: (event: KeyboardEvent) => unknown;
  wallsRef: RefObject<HTMLObjectElement>;
}

export function useKeysSubscription({ onKeyDown, onKeyUp, wallsRef }: Props) {
  useEffect(() => {
    if (wallsRef.current) {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }
  }, [wallsRef.current]);
}
