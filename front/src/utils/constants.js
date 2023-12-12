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

const TEXT_INPUT_PATTERN = `/[A-Za-zА-Яа-яЁё0-9s!-"№;%:?*()'/.,\\«»]/gi`;
const TEXT_INPUT_ERROR_MESSAGE = `Допустимы кириллица, латиница, цифры и спецсимволы !-"№;%:?*()'/.,\\«»`;
const AGREEMENT_URL =
  'https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FpLbl5zUkeYjYBOkGqqwoieqol9TU%2Bil2AbAW6HiflVfSX%2B%2Buiu0GjXWxHiex0GHIq%2FJ6bpmRyOJonT3VoXnDag%3D%3D&name=%D0%9F%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5.docx&nosw=1';

export {
  buttons,
  progressBarSteps,
  defaultMeasureUnits,
  TEXT_INPUT_PATTERN,
  TEXT_INPUT_ERROR_MESSAGE,
  AGREEMENT_URL,
};

export const STARS_TOTAL = 3;
