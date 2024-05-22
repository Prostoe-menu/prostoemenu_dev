
ВАЖНО!

Ветка master для оставлена для соединения веток, как “готовый тестовый продукт”.

Фронты работают в ветке frontend, бэки - в ветке backend.

  
  

#### Как загрузить проект на удаленный репозиторий:

  

* Через git bash/terminal переходим в директорию, где храниться проект `cd prostoemenu`.

* Далее ВАЖНО! Выбираем свою ветку разработки (backend, frontend), для этого пишем `git checkout backend`, `git checkout frontend`.

* Подтягиваем изменения, внесенные коллегами 'git pull'.

* Создаем новую временную ветку и сразу в нее переключаемся командой 'git checkout -b имя_временной_ветки'.

* Пишем код.

* Фиксируем внесенные изменения (создаем коммит) git commit -m “Здесь комментарий к коммиту”

* Убеждаемся, что в данный момент мы находимся в нужной (временной) ветке репозитория командой `git status`.

* Пушим на удаленный репозиторий `git push`

* В интерфейсе гитхаба создаем пуллреквест на ветку backend/frontend и запрашивем ревью у коллег.

  
  

#### Как получить обновления от других разработчиков:

  

* Для того, что бы подтянуть все обновления в вашей ветке, написанные за ночь коллегой выполняем команду `git pull`

* Для того, что бы просмотреть чем отличается локальный репозиторий от удаленного, можно воспользоваться командой `git status`, она покажет новые созданные файлы в вашей ветке, измененные файлы, удаленные и пр.

  

GitGub сохраняет все ваши коммиты, в любой момент вы сможете откатиться на необходимую вам версию.

  
  

#### Для запуска backend части проекта необходимо:

 * Клонировать репозиторий
 * В папке с репозиторием создать файл `.env`, который должен содержать следующие переменные:

    SECRET_KEY=your_secret_key
    ENVIRONMENT=PROD | DEV
    DB_ENGINE=django.db.backends.postgresql
    POSTGRES_DB=your_name_of_db
    POSTGRES_USER=your_username_to_db_access
    POSTGRES_PASSWORD=your_password
 
|Variable|Default Value|Description|
|--|--|--|
|`SECRET_KEY`|`django-insecure-*rojrw1fe1v4h)bkz^6amo-p1824p5@yw7z9+hps)rb*ptq_th`|Секретный ключ для Django. Для прода обязательно использовать другой ключ!|
|`ENVIRONMENT`|`DEV`|Переменная окружения. Допускается два значения: `PROD` и `DEV`. Если значение установлено `PROD`, то будут загружены настройки для прода, если `DEV` - для разработки. Если вы хотите вести разработку с использованием контейнеров, тогда вам нужно установить значение переменной `PROD`, а запуск проекта с помощью `docker compose` производить из папки `infra/develop`.|
|`DB_ENGINE`|`django.db.backends.postgresql`|Указывается какой бэк будет использован. Значение переменной будет использовано, только если `ENVIRONMENT=PROD`, в режиме `DEV` будет использована база SQLite.|
|`POSTGRES_DB`|`postgres`|Название базы данных. Значение переменной необходимо, только если `ENVIRONMENT=PROD`|
|`POSTGRES_USER`|`postgres`|Пользователь для доступа к базе данных. Значение переменной необходимо, только если `ENVIRONMENT=PROD`.|
|`POSTGRES_PASSWORD`|`postgres`|Пароль для доступа к базе данных. Значение переменной необходимо, только если `ENVIRONMENT=PROD`.|
|`DB_HOST`|`db`|Хост для доступа приложения к базе данных. Значение переменной необходимо, только если `ENVIRONMENT=PROD`.|
|`DB_PORT`|`5432`|Порт для доступа приложения к базе данных. Значение переменной необходимо, только если `ENVIRONMENT=PROD`.|

 * При переменной `ENVIRONMENT=DEV`:
	- создать виртуальное окружение `python3 -m venv venv`
	- перейти в папку `backend`
	- выполнить миграции `python manage.py migrate`
	- собрать статику `python manage.py collectstatic`
	- запустить сервер `python manage.py runserver`
* При переменной `ENVIRONMENT=PROD` и локальном запуске:
	- перейти в папку `infra/develop`
	- запустить контейнеры `docker compose up -d --build`
* При переменной и `ENVIRONMENT=PROD` и запуске на сервере:
	- перейти в папку `infra/production`
	- запустить контейнеры `sudo docker compose up -d --build`
 

 #### Для добавления существующих данных из файлов в БД выполните команды в следующем порядке:

* python manage.py load_measure - загрузка всех мер измерния в БД;
* python manage.py load_ingr_cats - загрузка категорий ингредиентов;
* python manage.py load_ingr - загрузка всех ингредиентов;
* python manage.py load_recipe_categories - загрузка категорий рецептов;
* python manage.py load_recipes - загрузка рецептов.
