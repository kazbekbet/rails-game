import { Ref, RefObject, useEffect } from 'react';

interface Props {
  onKeyDown: (event: KeyboardEvent) => unknown;
  onKeyUp: (event: KeyboardEvent) => unknown;
  wallsRef: RefObject<HTMLObjectElement>;
}

export function useKeysSubscription({ onKeyDown, onKeyUp, wallsRef }: Props) {
  useEffect(() => {
    if (wallsRef.current) {
      wallsRef.current.contentDocument?.addEventListener('keydown', onKeyDown);
      window.addEventListener('keydown', onKeyDown);

      wallsRef.current.contentDocument?.addEventListener('keyup', onKeyUp);
      window.addEventListener('keyup', onKeyUp);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        wallsRef.current?.contentDocument?.removeEventListener(
          'keydown',
          onKeyDown
        );
        wallsRef.current?.contentDocument?.removeEventListener(
          'keyup',
          onKeyUp
        );
      };
    }
  }, [wallsRef.current]);
}
