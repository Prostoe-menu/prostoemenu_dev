export const timeFormat = (minutes) => {
  if (minutes < 60) return minutsPlurals(minutes);

  const h = parseInt(minutes / 60);
  const m = minutes % 60;

  if (h > 0 && m > 0) return `${hourPlurals(h)} ${minutsPlurals(m)}`;

  return hourPlurals(h);
};

const plurals = (m, arr) => {
  if (m > 4 && m < 21) return `${m} ${arr[2]}`;

  const n = m % 10;

  if (n === 1) return `${m} ${arr[0]}`;

  if (n > 1 && n < 5) return `${m} ${arr[1]}`;

  return `${m} ${arr[2]}`;
};

const minutsPlurals = (m) => {
  return plurals(m, ['минута', 'минуты', 'минут']);
};

const hourPlurals = (h) => {
  return plurals(h, ['час', 'часа', 'часов']);
};
