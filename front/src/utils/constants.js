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
  {
    text: 'Основная информация',
    path: 'main',
  },
  {
    text: 'Ингредиенты',
    path: 'ingredients',
  },
  {
    text: 'Этапы готовки',
    path: 'stages',
  },
  {
    text: 'Дополнительная информация',
    path: 'additional-info',
  },
];

export { buttons, progressBarSteps };
