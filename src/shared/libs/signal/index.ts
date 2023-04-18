import { setEvent, setStore } from 're-event';

const send = setEvent<string>();
const clear = setEvent();

const store = setStore('', { attachLogger: true, name: 'signalStore' })
  .on(send, (_, payload) => payload)
  .clear(clear);

export const signal = {
  send,
  clear,
  store,
};
