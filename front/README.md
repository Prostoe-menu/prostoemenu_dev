# Простое Меню (Frontend)

Фронтенд-часть веб-приложения по поиску рецептов.

### [Стайлгайд](https://github.com/Prostoe-menu/prostoemenu_dev/blob/frontend/front/src/docs/style-guide.md)

## Инструкция по запуску

**1. Склонировать проект**

**2. Установить зависимости командой:**

```bash
npm install
```

Пакеты установятся на основе дерева в `package-lock.json`.

В дальнейшем `package-lock.json` не должен изменяться, за исключением случаев, когда необходимо добавить новый пакет в проект (по согласованию с командой) или обновить имеющиеся зависимости.

**3. После успешной установки зависимостей создать файл `.env`, скопировать в него переменные из `.env.example` и обновить в соответствии с текущим IP бекенда.**

**4. Запуск приложения:**

```bash
npm run start
```

Запускает приложение в режиме разработки.
Открыть [http://localhost:3000](http://localhost:3000/), чтобы посмотреть приложение в браузере.

## Работа с git:

1. Участник создает Issue для работы над задачей. Пример наименования Issue: `FRONTEND - {Краткое описание}`. В описании Issue Участник:
   - подробно описывает задачу и возможные проблемы
   - назначает себя в Assignee
   - выбирает подходящий label-префикс
2. Разработка фронтендовой части приложения ведется в ветке `frontend`. При работе над задачей Участник создаёт из `frontend` ветку с нужным префиксом (подробнее см. ниже)
3. Участник комитит изменения, в начале названия комита пишет номер Issue, который он решает, со знака `#` и краткое описание проделанной работы. Например, `#1-create-Title-component`
4. По окончанию работы над задачей Участник делает Pull Request (далее - PR) и добавляет туда лида и минимум еще одного участника команды фронтенда. Структура наименования PR: `FRONTEND - #{Issue} - {Краткое описание}`
5. В описании PR участник ссылается на Issue, над которым работал, описывает результат и возможные проблемы/сложности
6. После получения двух аппрувов, лид делает squash коммитов и мерджит во frontend-ветку. Без согласования с лидом самостоятельно PR во frontend не мерджится

Пример наименования ветки: `fd-development-1-cooking-steps`

- fd || bd - (frontend) или (backend) часть приложения
- development - префикс
- 1 - id Issue
- cooking-steps - краткое описание

### Префиксы:

- **development** - разработка новой фичи/компонента
- **enhancement** - улучшение, доработки уже существующей фичи
- **test** - добавление или изменение тестов
- **fix** - исправление ошибок, багов
- **documentation** - разработка/корректировка документации
- **refactor** - техдолг (избавление от легаси, рефакторинг, опечатки и т.д.)
- **style** - исправления по код-стайлу. Не связаны с функциональностью и ошибками (изменения табуляции, отступов, знаков препинания)
