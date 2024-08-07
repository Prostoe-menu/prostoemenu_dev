# Generated by Django 5.0.2 on 2024-07-10 13:14

import django.core.validators
from django.db import migrations, models

import common.validators


class Migration(migrations.Migration):

    dependencies = [
        ("measurements", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="measurement",
            name="abbreviation",
            field=models.CharField(
                max_length=30,
                validators=[
                    common.validators.AcceptedSymbolsValidator(
                        {
                            "'",
                            " ",
                            "!",
                            '"',
                            "%",
                            "(",
                            ")",
                            "*",
                            "+",
                            ",",
                            "-",
                            ".",
                            "/",
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            ":",
                            ";",
                            "?",
                            "A",
                            "B",
                            "C",
                            "D",
                            "E",
                            "F",
                            "G",
                            "H",
                            "I",
                            "J",
                            "K",
                            "L",
                            "M",
                            "N",
                            "O",
                            "P",
                            "Q",
                            "R",
                            "S",
                            "T",
                            "U",
                            "V",
                            "W",
                            "X",
                            "Y",
                            "Z",
                            "\\",
                            "a",
                            "b",
                            "c",
                            "d",
                            "e",
                            "f",
                            "g",
                            "h",
                            "i",
                            "j",
                            "k",
                            "l",
                            "m",
                            "n",
                            "o",
                            "p",
                            "q",
                            "r",
                            "s",
                            "t",
                            "u",
                            "v",
                            "w",
                            "x",
                            "y",
                            "z",
                            "«",
                            "°",
                            "»",
                            "¼",
                            "½",
                            "Ё",
                            "А",
                            "Б",
                            "В",
                            "Г",
                            "Д",
                            "Е",
                            "Ж",
                            "З",
                            "И",
                            "Й",
                            "К",
                            "Л",
                            "М",
                            "Н",
                            "О",
                            "П",
                            "Р",
                            "С",
                            "Т",
                            "У",
                            "Ф",
                            "Х",
                            "Ц",
                            "Ч",
                            "Ш",
                            "Щ",
                            "Ъ",
                            "Ы",
                            "Ь",
                            "Э",
                            "Ю",
                            "Я",
                            "а",
                            "б",
                            "в",
                            "г",
                            "д",
                            "е",
                            "ж",
                            "з",
                            "и",
                            "й",
                            "к",
                            "л",
                            "м",
                            "н",
                            "о",
                            "п",
                            "р",
                            "с",
                            "т",
                            "у",
                            "ф",
                            "х",
                            "ц",
                            "ч",
                            "ш",
                            "щ",
                            "ъ",
                            "ы",
                            "ь",
                            "э",
                            "ю",
                            "я",
                            "ё",
                            "–",
                            "—",
                            "№",
                        }
                    )
                ],
                verbose_name="Аббревиатура",
            ),
        ),
        migrations.AlterField(
            model_name="measurement",
            name="name",
            field=models.CharField(
                max_length=30,
                unique=True,
                validators=[
                    django.core.validators.MinLengthValidator(2),
                    common.validators.AcceptedSymbolsValidator(
                        {
                            "'",
                            " ",
                            "!",
                            '"',
                            "%",
                            "(",
                            ")",
                            "*",
                            "+",
                            ",",
                            "-",
                            ".",
                            "/",
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            ":",
                            ";",
                            "?",
                            "A",
                            "B",
                            "C",
                            "D",
                            "E",
                            "F",
                            "G",
                            "H",
                            "I",
                            "J",
                            "K",
                            "L",
                            "M",
                            "N",
                            "O",
                            "P",
                            "Q",
                            "R",
                            "S",
                            "T",
                            "U",
                            "V",
                            "W",
                            "X",
                            "Y",
                            "Z",
                            "\\",
                            "a",
                            "b",
                            "c",
                            "d",
                            "e",
                            "f",
                            "g",
                            "h",
                            "i",
                            "j",
                            "k",
                            "l",
                            "m",
                            "n",
                            "o",
                            "p",
                            "q",
                            "r",
                            "s",
                            "t",
                            "u",
                            "v",
                            "w",
                            "x",
                            "y",
                            "z",
                            "«",
                            "°",
                            "»",
                            "¼",
                            "½",
                            "Ё",
                            "А",
                            "Б",
                            "В",
                            "Г",
                            "Д",
                            "Е",
                            "Ж",
                            "З",
                            "И",
                            "Й",
                            "К",
                            "Л",
                            "М",
                            "Н",
                            "О",
                            "П",
                            "Р",
                            "С",
                            "Т",
                            "У",
                            "Ф",
                            "Х",
                            "Ц",
                            "Ч",
                            "Ш",
                            "Щ",
                            "Ъ",
                            "Ы",
                            "Ь",
                            "Э",
                            "Ю",
                            "Я",
                            "а",
                            "б",
                            "в",
                            "г",
                            "д",
                            "е",
                            "ж",
                            "з",
                            "и",
                            "й",
                            "к",
                            "л",
                            "м",
                            "н",
                            "о",
                            "п",
                            "р",
                            "с",
                            "т",
                            "у",
                            "ф",
                            "х",
                            "ц",
                            "ч",
                            "ш",
                            "щ",
                            "ъ",
                            "ы",
                            "ь",
                            "э",
                            "ю",
                            "я",
                            "ё",
                            "–",
                            "—",
                            "№",
                        }
                    ),
                ],
                verbose_name="Название",
            ),
        ),
    ]
