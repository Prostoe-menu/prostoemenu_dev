import string
from random import choice
from django.core.mail import EmailMessage


def send_email(instance, activation_code):
    email = EmailMessage(
        subject='Активация аккаунта Prostoemenu.',
        body=f'Привет, {instance.username}! \nВаш код активации Prostoemenu: {activation_code}.\n  Для завершения процесса регистрации введите его на странице http://188.225.38.21:8000/account/check-code/ ',
        from_email='prostoemenu2023@yandex.ru',
        to=[instance.email],
    )
    email.send()


def generate_activation_code():
    return ''.join(choice(string.ascii_letters + string.digits) for x in range(6))
