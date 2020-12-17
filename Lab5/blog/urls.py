from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('delete/<int:pk>/', views.post_delete, name='post_delete'),
    path('singup/', views.singup, name='singup'),
    path('webscrap/', views.webscrap, name='webscrap'),
    path('xpath/', views.xpath, name='xpath')
]