export const timeFormat = (minutes: number) => {
  if (minutes < 60) return minutsPlurals(minutes);

  const h = parseInt(String(minutes / 60));
  const m = minutes % 60;

  if (h > 0 && m > 0) return `${hourPlurals(h)} ${minutsPlurals(m)}`;

  return hourPlurals(h);
};

const plurals = (m: number, arr: Array<string>) => {
  if (m > 4 && m < 21) return `${m} ${arr[2]}`;

  const n = m % 10;

  if (n === 1) return `${m} ${arr[0]}`;

  if (n > 1 && n < 5) return `${m} ${arr[1]}`;

  return `${m} ${arr[2]}`;
};

const minutsPlurals = (m: number) => {
  return plurals(m, ['минута', 'минуты', 'минут']);
};

const hourPlurals = (h: number) => {
  return plurals(h, ['час', 'часа', 'часов']);
};

export const formatMeasureUnit = (unit: string) => {
  return unit.endsWith('.') ? unit.slice(0, -1) : unit;
};

export const isNumber = (inputStr: string) => {
  const pattern = /^\d*\.?\d*$/;

  return pattern.test(inputStr);
};
