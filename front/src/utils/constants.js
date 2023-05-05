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
    unitName: 'г',
  },
  {
    id: 2,
    unitName: 'кг',
  },
  {
    id: 3,
    unitName: 'мл',
  },
  {
    id: 4,
    unitName: 'л',
  },
  {
    id: 5,
    unitName: 'ч. ложка',
  },
  {
    id: 6,
    unitName: 'ст. ложка',
  },
  {
    id: 7,
    unitName: 'штука',
  },
  {
    id: 8,
    unitName: 'упаковка',
  },
  {
    id: 9,
    unitName: 'стакан',
  },
  {
    id: 10,
    unitName: 'пучок',
  },
  {
    id: 11,
    unitName: 'пакет',
  },
  {
    id: 12,
    unitName: 'пачка',
  },
  {
    id: 13,
    unitName: 'горсть',
  },
  {
    id: 14,
    unitName: 'щепотка',
  },
  {
    id: 15,
    unitName: 'ломтик',
  },
  {
    id: 16,
    unitName: 'кочан',
  },
  {
    id: 17,
    unitName: 'веточка',
  },
  {
    id: 18,
    unitName: 'банка',
  },
  {
    id: 19,
    unitName: 'зубчик',
  },
  {
    id: 20,
    unitName: 'по вкусу',
  },
];

export { buttons, progressBarSteps, defaultMeasureUnits };
