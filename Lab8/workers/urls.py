from django.urls import path

from . import views

urlpatterns = [
    path('1/', views.fib, name='fibonaci'),
    path('2/', views.pow, name='power'),
    path('3/', views.fac, name='factional'),
]