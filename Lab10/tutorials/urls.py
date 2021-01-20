from django.conf.urls import url 
from tutorials import views 
from django.urls import path, include
from .views import PostDetail
from django.contrib import admin
from rest_framework import routers
from tutorials import views

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
urlpatterns = [ 
    path('api/tutorials', views.PostView.as_view(), name='posts_list'),
    path('api/tutorials/', views.SearchPostsView.as_view(), ),
    path('api/tutorials/<int:pk>/', PostDetail.as_view()),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]