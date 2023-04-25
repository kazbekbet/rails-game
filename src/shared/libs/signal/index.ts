import { setEvent, setStore } from 're-event';

function createSignal() {
  const send = setEvent<string>();
  const clear = setEvent<void>();

  const store = setStore('')
    .on(send, (_, payload) => payload)
    .clear(clear);

  return {
    send,
    clear,
    store,
  };
}

export const signal = createSignal();

function signalContainer() {
  const signalsMap = new Map<string, ReturnType<typeof createSignal>>();

  function registerSignal(key: string) {
    if (!signalsMap.has(key)) {
      signalsMap.set(key, createSignal());
    }
  }

  function useSignal(key: string) {
    if (!signalsMap.has(key)) {
      console.error(`Signal with key: ${key} is not exist! Signal will be created again.`);
      registerSignal(key);
    }
    return signalsMap.get(key) as ReturnType<typeof createSignal>;
  }

  return { registerSignal, useSignal };
}

export const { registerSignal, useSignal } = signalContainer();
