from io import StringIO

from django.core.management import call_command
from django.test import TestCase


class PendingMigrationsTests(TestCase):
    def test_no_missing_migrations(self):
        out = StringIO()
        try:
            call_command(
                "makemigrations",
                "--check",
                stdout=out,
                stderr=StringIO(),
            )
        except SystemExit:
            raise AssertionError("Pending migrations:\n" + out.getvalue()) from None