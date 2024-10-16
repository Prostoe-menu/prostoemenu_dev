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
  defaultMeasureUnits,
  TEXT_INPUT_PATTERN,
  TEXT_INPUT_ERROR_MESSAGE,
  AGREEMENT_URL,
};

export const STARS_TOTAL = 3;

export const FETCH_RECIPES_ERROR_MESSAGE =
  'Упс! Что-то пошло не так при загрузке рецептов, но мы уже работаем над этим!';

export const FETCH_RECIPE_BY_ID_ERROR_MESSAGE =
  'Упс! Что-то пошло не так при загрузке рецепта, но мы уже работаем над этим!';

export const FETCH_RECIPES_BY_INGREDIENT_ERROR_MESSAGE =
  'Упс! Что-то пошло не так при поиске рецептов, но мы уже работаем над этим!';

export const MAX_IMAGE_SIZE = 5; // MB

export const MAX_IMAGE_SIZE_IN_BYTES = MAX_IMAGE_SIZE * 1048576; // 1 MB = 1,048,576 bytes

// minimum image dimentions

export const MIN_IMAGE_WIDTH = 600; // pixels
export const MIN_IMAGE_HEIGHT = 600; // pixels
