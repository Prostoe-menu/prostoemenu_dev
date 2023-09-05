/* eslint-disable import/prefer-default-export */
const buttons = {
  withBorder: {
    yellow: 'button_border_yellow',
    grey: 'button_border_grey',
  },
  withBg: {
    yellow: 'button_bg_yellow',
  },
};

const progressBarSteps = [
  { id: 1, text: 'Основная информация', path: 'main' },
  { id: 2, text: 'Ингредиенты', path: 'ingredients' },
  { id: 3, text: 'Этапы готовки', path: 'stages' },
  { id: 4, text: 'Дополнительная информация', path: 'additional-info' },
];

const defaultMeasureUnits = [
  {
    id: 1,
    name: 'г',
  },
  {
    id: 2,
    name: 'кг',
  },
  {
    id: 3,
    name: 'мл',
  },
  {
    id: 4,
    name: 'л',
  },
  {
    id: 5,
    name: 'ч. ложка',
  },
  {
    id: 6,
    name: 'ст. ложка',
  },
  {
    id: 7,
    name: 'штука',
  },
  {
    id: 8,
    name: 'упаковка',
  },
  {
    id: 9,
    name: 'стакан',
  },
  {
    id: 10,
    name: 'пучок',
  },
  {
    id: 11,
    name: 'пакет',
  },
  {
    id: 12,
    name: 'пачка',
  },
  {
    id: 13,
    name: 'горсть',
  },
  {
    id: 14,
    name: 'щепотка',
  },
  {
    id: 15,
    name: 'ломтик',
  },
  {
    id: 16,
    name: 'кочан',
  },
  {
    id: 17,
    name: 'веточка',
  },
  {
    id: 18,
    name: 'банка',
  },
  {
    id: 19,
    name: 'зубчик',
  },
  {
    id: 20,
    name: 'по вкусу',
  },
];

export { buttons, progressBarSteps, defaultMeasureUnits };
