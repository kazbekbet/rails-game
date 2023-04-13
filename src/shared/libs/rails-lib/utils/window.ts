/**
 * Утилита для передачи в контекст Window указанных методов.
*/
export const populateWindow = (props: Record<string, Function>) => {
  for (const prop in props) {
    // @ts-expect-error
    window[prop] = props[prop];
  }
};
