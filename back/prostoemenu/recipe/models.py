from django.core.validators import FileExtensionValidator
from django.db import models
from django.template.defaultfilters import slugify

class Recipe(models.Model):
    name = models.CharField(max_length=100, verbose_name='Рецепт', unique=True)
    description = models.TextField(verbose_name='Описание')
    cooking_time = models.TimeField(verbose_name='Время готовки')
    publication_date = models.DateField(auto_now_add=True, verbose_name='Дата создания')
    update_date = models.DateField(auto_now=True, verbose_name='Дата обновления')
    rating = models.DecimalField(null=True,max_digits=1, decimal_places=1, verbose_name='Рейтинг')
    number_of_votes = models.IntegerField(null=True, verbose_name='Количество голосов')
    exists = models.BooleanField(default=True, verbose_name='Существует')
    quantity = models.IntegerField(default=1, verbose_name='Количество порций')
    info = models.TextField(null=True, verbose_name='Доп. информация')
    valid = models.BooleanField(default=False, verbose_name='Прошло модерацию')
    parced = models.BooleanField(default=False, verbose_name='Получено от парсинга')
    complexity = models.CharField(max_length=40, verbose_name='Сложность готовки')

    def __str__(self):
       return self.name

    class Meta:
        verbose_name = 'Рецепт'
        verbose_name_plural = 'Рецепты'
        ordering = ['name', 'rating']


#Nation and recipe_nation
class Nation(models.Model):
    name = models.CharField(max_length=100, verbose_name='Кухня страны', unique=True)
    description = models.TextField(verbose_name='Описание кухни страны')

    recipe = models.ManyToManyField(Recipe, through='recipe_nation')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Национальная кухня'
        verbose_name_plural = 'Национальные кухни'
        ordering = ['name']


class recipe_nation(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    nation = models.ForeignKey(Nation, on_delete=models.CASCADE, verbose_name='Номер кухни страны')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.nation.__str__()

    class Meta:
        verbose_name = 'Рецепт национальной кухни'
        verbose_name_plural = 'Рецепты национальной кухни'
        ordering = ['recipe']
        unique_together = ('recipe', 'nation')


#method and recipe_method
class Method(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название метода', unique=True)
    description = models.TextField(null=True, verbose_name='Описание метода')

    recipe = models.ManyToManyField(Recipe, through='recipe_method')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Метод'
        verbose_name_plural = 'Методы'
        ordering = ['name']


class recipe_method(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    method = models.ForeignKey(Method, on_delete=models.CASCADE, verbose_name='Номер метода')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.method.__str__()

    class Meta:
        verbose_name = 'Метод для рецепта'
        verbose_name_plural = 'Методы для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'method')


#Category Recipe_category
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название категории', unique=True)
    description = models.TextField(null=True, verbose_name='Описание категории')

    recipe = models.ManyToManyField(Recipe, through='recipe_category')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['name']


class recipe_category(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Номер категории')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.category.__str__()

    class Meta:
        verbose_name = 'Категория для рецепта'
        verbose_name_plural = 'Категории для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'category')


#Photo recipe_photo
class Photo(models.Model):
    photo = models.ImageField(upload_to='images/', verbose_name='Фотография',  validators=[FileExtensionValidator( ['jpeg', 'jpg', 'png', 'webp'])])
    recipe = models.ManyToManyField(Recipe, through='recipe_photo')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'


class recipe_photo(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, verbose_name='Номер фото')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.photo.__str__()

    class Meta:
        verbose_name = 'Фото для рецепта'
        verbose_name_plural = 'Фотографии для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'photo')


#Steps recipe_step
class Step(models.Model):
    step_number = models.IntegerField(verbose_name='Номер шага')
    description = models.TextField(verbose_name='Описание шага')
    photo = models.ImageField(null=True, verbose_name='Фотография')

    recipe = models.ManyToManyField(Recipe, through='recipe_step')

    def __str__(self):
        return self.step_number

    class Meta:
        verbose_name = 'Метод'
        verbose_name_plural = 'Методы'
        ordering = ['step_number']


class recipe_step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    step = models.ForeignKey(Step, on_delete=models.CASCADE, verbose_name='Номер метода')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.step.__str__()

    class Meta:
        verbose_name = 'Шаг для рецепта'
        verbose_name_plural = 'Шаги для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'step')


#Tag recipe_tags
class Tag(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название тэга', unique=True)
    recipe = models.ManyToManyField(Recipe, through='recipe_tags')

    def __str__(self):
        return self.name


    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'
        ordering = ['name']


class recipe_tags(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, verbose_name='Номер тэга')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.tag.__str__()

    class Meta:
        verbose_name = 'Тэг для рецепта'
        verbose_name_plural = 'Тэги для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'tag')


#Ingredient recipe_ingredient
class Ingredient(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название ингредиента', unique=True)
    exists = models.BooleanField(default=True, verbose_name='Существует')

    recipe = models.ManyToManyField(Recipe, through='recipe_ingredient')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'
        ordering = ['name']


class recipe_ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, verbose_name='Номер ингредиента')

    exists = models.BooleanField(default=True, verbose_name='Существует')
    volume = models.IntegerField(verbose_name='Количество')
    measure = models.CharField(max_length=20, verbose_name='Единица измерения')

    def __str__(self):
        return self.recipe.__str__() + " " + self.ingredient.__str__()

    class Meta:
        verbose_name = 'Ингредиент для рецепта'
        verbose_name_plural = 'Ингредиент для рецепта'
        ordering = ['recipe']
        unique_together = ('recipe', 'ingredient')


#Global ingredient analogy
class ingredient_alternative(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, verbose_name='Номер ингредиента', related_name='ingredient_first')
    ingredient_alternative = models.ForeignKey(Ingredient, on_delete=models.CASCADE, verbose_name='Номер альтернативы ингредиента', related_name='ingredient_second')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.ingredient.__str__() + " " + self.ingredient_alternative.__str__()

    class Meta:
        verbose_name = 'Ингредиент для замены'
        verbose_name_plural = 'Ингредиенты для замены'
        ordering = ['ingredient']
        unique_together = ('ingredient', 'ingredient_alternative')


#Local ingredeint analogy
class ingredient_recipe_alternative(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, verbose_name='Номер ингредиента', related_name='ingredient_third')
    ingredient_alternative = models.ForeignKey(Ingredient, on_delete=models.CASCADE, verbose_name='Номер альтернативы ингредиента', related_name='ingredient_forth')
    exists = models.BooleanField(default=True, verbose_name='Существует')

    def __str__(self):
        return self.recipe.__str__() + " " + self.ingredient.__str__() + " " + self.ingredient_alternative.__str__()

    class Meta:
        verbose_name = 'Ингредиент для замены'
        verbose_name_plural = 'Ингредиенты для замены'
        ordering = ['recipe']
        unique_together = ('recipe', 'ingredient', 'ingredient_alternative')


#Feedback
class Feedback(models.Model):
    email = models.EmailField()
    message = models.TextField(verbose_name='Сообщение')
    date = models.DateField(verbose_name='Когда прислали')
    page_id = models.IntegerField(null=True, verbose_name='Номер страницы')
    name = models.CharField(max_length=50, verbose_name='Заголовок сообщения')
    response = models.URLField(verbose_name='Адрес страницы')


#Comment recipe_comment
class Comment(models.Model):
    text = models.TextField(verbose_name='Текст комментария')
    header = models.CharField(max_length=100, verbose_name='Заголовок')
    username = models.CharField(max_length=100, verbose_name='Имя пользователя')
    email = models.EmailField()
    user_id = models.IntegerField(verbose_name='Номер пользователя')
    description = models.TextField(null=True)
    photo = models.ImageField(verbose_name='Фото к комментарию', validators=[FileExtensionValidator( ['jpeg', 'jpg', 'png', 'webp'])])
    comment_date = models.DateField(verbose_name='Дата комментария')

    recipe = models.ManyToManyField(Recipe, through='recipe_comment')

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'
        ordering = ['comment_date']


class recipe_comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, verbose_name='Номер рецепта')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, verbose_name='Номер коммента')
    exist = models.BooleanField(verbose_name='Существует')

    def __str__(self):
        return self.comment.__str__() + " " + self.recipe.__str__()

    class Meta:
        verbose_name = 'Комментарий к рецепту'
        verbose_name_plural = 'Комментарии к рецепту'
        ordering = ['recipe']