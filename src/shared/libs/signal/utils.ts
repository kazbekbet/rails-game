export function buildHistoryMessage(type: 'send' | 'clear', payload?: unknown) {
  const events: Record<typeof type, string> = {
    send: 'Event sent',
    clear: 'Store cleared',
  };

  const time = new Date();
  const eventName = events[type];

  return { time, eventName, payload };
}
