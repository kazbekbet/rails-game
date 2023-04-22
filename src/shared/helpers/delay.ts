export function delay<Res>(fn: () => Res, timeoutMs = 1000): Promise<Res> {
  return new Promise(res => {
    setTimeout(() => res(fn()), timeoutMs);
  });
}
