from django.db import models

# Create your models here.

class Employee(models.Model):
    full_name = models.CharField(max_length=200, verbose_name="Nombre Completo")
    dni = models.CharField(max_length=15, verbose_name="Cédula")
    birth_date = models.DateField(verbose_name="Fecha de Nacimiento")
    email = models.EmailField(verbose_name="Email")
    phone_number = models.CharField(max_length=10, verbose_name="Telefono")

    def __str__(self) -> str:
        return self.full_name