from django import forms
from .models import Employee

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        #fields = ['full_name', 'dni', 'birthdate', 'email', 'phone_number']
        fields = '__all__'
        labels = {
            'name': 'Nombre Completo',
            'dni': 'Cédula',
            'birth_date': 'Fecha de Nacimiento',
            'email': 'email',
            'phone_numer': 'Telefono'
        }