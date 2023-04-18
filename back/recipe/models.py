from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db import models
from django.contrib.postgres.indexes import GinIndex

from account.models import Profile


class Ingredient(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название ингредиента',
        unique=True)
    category = models.CharField(
        max_length=100,
        verbose_name='Категория ингредиента',
        default='Category')
    sort = models.IntegerField(null=True, verbose_name='Порядок ингредиента')

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            GinIndex(
                name='ingredient_name_gin_idx',
                fields=['name'],
                opclasses=['gin_trgm_ops'])]
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'


class Tag(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название тэга',
        unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'
        ordering = ['name']


class Step(models.Model):
    step_number = models.IntegerField(
        verbose_name='Номер шага')
    description = models.TextField(
        verbose_name='Описание шага')
    photo = models.ImageField(
        null=True,
        verbose_name='Фотография')

    def __str__(self):
        return self.step_number

    class Meta:
        verbose_name = 'Метод'
        verbose_name_plural = 'Методы'
        ordering = ['step_number']


class Photo(models.Model):
    photo = models.ImageField(
        upload_to='images/',
        verbose_name='Фотография',
        validators=[FileExtensionValidator(['jpeg', 'jpg', 'png', 'webp'])])

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'


class Method(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название метода',
        unique=True)
    description = models.TextField(
        null=True,
        verbose_name='Описание метода')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Метод'
        verbose_name_plural = 'Методы'
        ordering = ['name']


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название категории',
        unique=True)
    description = models.TextField(
        null=True,
        verbose_name='Описание категории')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['name']


class Recipe(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Рецепт',
        unique=True)
    description = models.TextField(
        verbose_name='Описание')
    cooking_time = models.IntegerField(
        verbose_name='Время готовки')
    oven_time = models.IntegerField(
        verbose_name='Время готовки у плиты',
        default=0)
    publication_date = models.DateField(
        auto_now_add=True,
        verbose_name='Дата создания')
    update_date = models.DateField(
        auto_now=True,
        verbose_name='Дата обновления')
    rating = models.DecimalField(
        null=True, max_digits=1,
        decimal_places=1, verbose_name='Рейтинг')
    number_of_votes = models.IntegerField(
        null=True, verbose_name='Количество голосов')
    exists = models.BooleanField(
        default=True, verbose_name='Существует')
    quantity = models.IntegerField(
        default=1, verbose_name='Количество порций')
    info = models.TextField(
        null=True, verbose_name='Доп. информация')
    valid = models.BooleanField(
        default=False, verbose_name='Прошло модерацию')
    parced = models.BooleanField(
        default=False, verbose_name='Получено от парсинга')
    complexity = models.CharField(
        max_length=40, verbose_name='Сложность готовки')
    is_approved = models.BooleanField(
        default=False, verbose_name='Проверено')
    user = models.ForeignKey(
        User,
        null=True,
        db_column='user',
        on_delete=models.SET_NULL,
        verbose_name='Id автора',
        related_name='recipes')
    ingredient = models.ManyToManyField(
        Ingredient, through='RecipeIngredients',
        through_fields=('recipe', 'ingredient'),
        related_name='ingredients')
    category = models.ManyToManyField(
        Category,
        through='RecipeCategories',
        related_name='categories')
    photo = models.ManyToManyField(
        Photo,
        through='RecipePhotos',
        related_name='photos')
    tag = models.ManyToManyField(
        Tag,
        through='RecipeTags',
        related_name='tags')
    step = models.ManyToManyField(
        Step,
        through='RecipeSteps',
        related_name='steps')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Рецепт'
        verbose_name_plural = 'Рецепты'


class RecipeMethods(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    method = models.ForeignKey(
        Method, on_delete=models.CASCADE,
        verbose_name='Номер метода')

    def __str__(self):
        return self.recipe.__str__() + " " + self.method.__str__()

    class Meta:
        verbose_name = 'Метод для рецепта'
        verbose_name_plural = 'Методы для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'method')


class RecipeCategories(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE,
        verbose_name='Номер категории')

    def __str__(self):
        return self.recipe.__str__() + " " + self.category.__str__()

    class Meta:
        verbose_name = 'Категория для рецепта'
        verbose_name_plural = 'Категории для рецепта'
        unique_together = ('recipe', 'category')


class RecipePhotos(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    photo = models.ForeignKey(
        Photo, on_delete=models.CASCADE,
        verbose_name='Номер фото')

    def __str__(self):
        return self.recipe.__str__() + " " + self.photo.__str__()

    class Meta:
        verbose_name = 'Фото для рецепта'
        verbose_name_plural = 'Фотографии для рецепта'
        unique_together = ('recipe', 'photo')


class RecipeSteps(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    step = models.ForeignKey(
        Step, on_delete=models.CASCADE,
        verbose_name='Номер метода')

    def __str__(self):
        return self.recipe.__str__() + " " + self.step.__str__()

    class Meta:
        verbose_name = 'Шаг для рецепта'
        verbose_name_plural = 'Шаги для рецепта'
        unique_together = ('recipe', 'step')


class RecipeTags(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    tag = models.ForeignKey(
        Tag, on_delete=models.CASCADE,
        verbose_name='Номер тэга')

    def __str__(self):
        return self.recipe.__str__() + " " + self.tag.__str__()

    class Meta:
        verbose_name = 'Тэг для рецепта'
        verbose_name_plural = 'Тэги для рецепта'
        unique_together = ('recipe', 'tag')


class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    ingredient = models.ForeignKey(
        Ingredient, on_delete=models.CASCADE,
        verbose_name='Номер ингредиента',
        related_name='ingredient')
    volume = models.IntegerField(
        verbose_name='Количество')
    measure = models.CharField(
        max_length=20,
        verbose_name='Единица измерения')

    # Alretnative for an ingredient, alternative could be only one
    ingredient_alternative = models.ForeignKey(
        Ingredient, on_delete=models.DO_NOTHING,
        verbose_name='Номер альтернативы',
        related_name='ingredient_alternative',
        blank=True, null=True)
    ingredient_alternative_volume = models.IntegerField(
        verbose_name='Количество',
        blank=True,
        null=True)
    ingredient_alternative_measure = models.CharField(
        max_length=20,
        verbose_name='Единица измерения',
        blank=True,
        null=True)

    def __str__(self):
        return self.recipe.__str__() + " " + self.ingredient.__str__()

    class Meta:
        verbose_name = 'Ингредиент для рецепта'
        verbose_name_plural = 'Ингредиент для рецепта'
        unique_together = ('recipe', 'ingredient')


# Measurement for frontend
class Measurement(models.Model):
    name = models.CharField(max_length=30, unique=True)
    abbreviation = models.CharField(max_length=30)
    # Rank size is to keep order of measurement for example gramm < kg etc
    rank_size = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'
        ordering = ['rank_size']


#############################################
# Global ingredient analogy TBA             #
#############################################
class IngredientAlternatives(models.Model):
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        verbose_name='Номер ингредиента',
        related_name='ingredient_first')
    ingredient_alternative = models.ForeignKey(
        Ingredient, on_delete=models.CASCADE,
        verbose_name='Номер альтернативы ингредиента',
        related_name='ingredient_second')

    def __str__(self):
        return (
                self.ingredient.__str__() +
                " " +
                self.ingredient_alternative.__str__())

    class Meta:
        verbose_name = 'Ингредиент для замены'
        verbose_name_plural = 'Ингредиенты для замены'
        ordering = ['ingredient']
        unique_together = ('ingredient', 'ingredient_alternative')


# Feedback
class Feedback(models.Model):
    email = models.EmailField()
    message = models.TextField(verbose_name='Сообщение')
    date = models.DateField(verbose_name='Когда прислали')
    page_id = models.IntegerField(null=True, verbose_name='Номер страницы')
    name = models.CharField(max_length=50, verbose_name='Заголовок сообщения')
    response = models.URLField(verbose_name='Адрес страницы')


# Comment recipe_comment
class Comment(models.Model):
    text = models.TextField(verbose_name='Текст комментария')
    header = models.CharField(max_length=100, verbose_name='Заголовок')
    username = models.CharField(
        max_length=100, verbose_name='Имя пользователя')
    email = models.EmailField()
    user_id = models.IntegerField(verbose_name='Номер пользователя')
    description = models.TextField(null=True)
    photo = models.ImageField(
        verbose_name='Фото к комментарию',
        validators=[FileExtensionValidator(['jpeg', 'jpg', 'png', 'webp'])])
    comment_date = models.DateField(verbose_name='Дата комментария')

    recipe = models.ManyToManyField(Recipe, through='RecipeComment')

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        ordering = ['comment_date']


class RecipeComment(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE,
        verbose_name='Номер рецепта')
    comment = models.ForeignKey(
        Comment, on_delete=models.CASCADE,
        verbose_name='Номер коммента')
    exist = models.BooleanField(verbose_name='Существует')

    def __str__(self):
        return self.comment.__str__() + " " + self.recipe.__str__()

    class Meta:
        verbose_name = 'Комментарий к рецепту'
        verbose_name_plural = 'Комментарии к рецепту'
