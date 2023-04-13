/**
 * Тип значений контекста модалок.
 */
export type TModalContextValues = {
  modalId?: string;
  modalsCount: number;
};

/**
 * Тип контекста модалок.
 */
export type TModalContext = TModalContextValues & {
  setModal?: (id: string | undefined) => void;
};
