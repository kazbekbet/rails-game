import { setEvent, setStore, Store, SetEvent } from 're-event';
import { buildHistoryMessage } from './utils';

interface Signal<Val> {
  send: SetEvent.Return<Val>;
  clear: SetEvent.Return<void>;
  store: Store<Val>;
  historyStore: Store<History>;
}

type History = Map<Date, ReturnType<typeof buildHistoryMessage>>;

function createSignal<Val>(initialValue: Val): Signal<Val> {
  const send = setEvent<Val>();
  const clear = setEvent<void>();

  const historyStore = setStore<History>(new Map())
    .on(send, (state, value) => {
      const { time, eventName, payload } = buildHistoryMessage('send', value);
      state.set(time, { time, eventName, payload });

      return state;
    })
    .on(clear, state => {
      const { time, eventName, payload } = buildHistoryMessage('send');
      state.set(time, { time, eventName, payload });

      return state;
    });

  const store = setStore(initialValue)
    .on(send, (_, payload) => payload)
    .clear(clear);

  return {
    send,
    clear,
    store,
    historyStore,
  };
}

function signalContainer() {
  const signalsMap = new Map<string, Signal<unknown>>();

  function registerSignal<Val>(key: string, initialValue: Val) {
    if (!signalsMap.has(key)) {
      signalsMap.set(key, createSignal(initialValue as unknown));
    }
  }

  function useSignal<Val>(key: string) {
    if (!signalsMap.has(key)) {
      console.error(`
        Signal with key: ${key} is not exist!
        Correct signal work is not guaranteed!
        Signal will be created again.
      `);
      // TODO: подумать насчёт спорного момента пересоздания сигнала.
      registerSignal(key, null);
    }

    return signalsMap.get(key) as Signal<Val>;
  }

  return { registerSignal, useSignal };
}

export const { registerSignal, useSignal } = signalContainer();
