export const timeFormat = (minutes) => {
  if (minutes < 60) return `${minutes} мин.`;

  const h = parseInt(minutes / 60);
  const m = minutes % 60;

  if (h > 0 && m > 0) return `${h} ч. ${m} мин.`;

  if (h > 0) return `${h} ч.`;

  return `${m} мин.`;
};
