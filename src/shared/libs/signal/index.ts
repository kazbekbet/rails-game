import { setEvent, setStore } from 're-event';

const send = setEvent<string>();
const clear = setEvent<void>();

const store = setStore('')
  .on(send, (_, payload) => payload)
  .clear(clear);

export const signal = {
  send,
  clear,
  store,
};
