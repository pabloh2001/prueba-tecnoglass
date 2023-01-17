from django.urls import path
from .views import home, employee, create, get_all, get, edit

urlpatterns = [
    path('', home, name='home'),
    path('employees/', employee, name='employees'),
    path('employees/create/', create, name='create'),
    path('employees/get-all/', get_all, name='get-all'),
    path('employees/get/<int:id>/', get, name='get'),
    path('employees/get/<int:id>/edit/', edit, name='edit'),
]
