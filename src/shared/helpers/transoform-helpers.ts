export const getStylesFromData = (data: string | undefined) => {
  if (typeof data !== 'string') {
    return {};
  }

  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
};
