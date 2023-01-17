from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from .models import Employee


def home(request):
    count_employees = Employee.objects.all().count()
    return render(request, 'employee/home.html', {"count_empl" : count_employees})

@login_required
def employee(request):
    return render(request, 'employee/employees.html')

@login_required
def get_all(request):
    employees = Employee.objects.all()
    employees_list = []
    for employee in employees:
        data_employee = {}
        data_employee['id'] = employee.id
        data_employee['full_name'] = employee.full_name
        data_employee['dni'] = employee.dni
        data_employee['birth_date'] = employee.birth_date
        data_employee['email'] = employee.email
        data_employee['phone_number'] = employee.phone_number
        employees_list.append(data_employee)
    
    return JsonResponse(employees_list, safe=False)

@login_required
def get(request, id):

    employee = Employee.objects.get(id=id)
    data_employee = {}
    data_employee['id'] = employee.id
    data_employee['full_name'] = employee.full_name
    data_employee['dni'] = employee.dni
    data_employee['birth_date'] = employee.birth_date
    data_employee['email'] = employee.email
    data_employee['phone_number'] = employee.phone_number

    return JsonResponse({"employee": data_employee}, safe=False)


@login_required
def create(request):
    if request.method == 'POST':
        full_name = request.POST['full_name']
        dni = request.POST['dni']
        birth_date = request.POST['birth_date']
        email = request.POST['email']
        phone_number = request.POST['phone_number']

        valid_empl = Employee.objects.filter(dni = dni).exists()
    
        if valid_empl:
            return JsonResponse({"msg": "La cédula ya existe", "code" : -1})
        else:
            employee = Employee(full_name=full_name, dni=dni, birth_date=birth_date, email=email, phone_number=phone_number)
            employee.save()
            return JsonResponse({"msg": "empleado creado correctamente", "code" : 1})

@login_required
def edit(request, id):
    if request.method == 'POST':
        id = request.POST['id']
        full_name = request.POST['full_name']
        dni = request.POST['dni']
        birth_date = request.POST['birth_date']
        email = request.POST['email']
        phone_number = request.POST['phone_number']
        
        valid_employee = Employee.objects.filter(dni = dni).exclude(id=id).exists()
    
        if valid_employee:
            return JsonResponse({"msg": "La cédula ya existe", "code" : -1})
        else:
            employee = Employee.objects.get(id=id)
            employee.full_name = full_name
            employee.dni = dni
            employee.birth_date = birth_date
            employee.email = email
            employee.phone_number = phone_number
            employee.save()
            return JsonResponse({"msg": "empleado modificado correctamente", "code" : 1})
