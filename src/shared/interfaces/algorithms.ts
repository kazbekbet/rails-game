export namespace Sorting {
  export interface FuncParams {
    array: number[];
    onTick: (array: number[]) => void;
    onStart: () => void;
    onEnd: (value: boolean) => void;
    onCurrentInner: (value: number) => void;
    onCurrentOuter: (value: number) => void;
    tickSpeed: number;
  }
}
