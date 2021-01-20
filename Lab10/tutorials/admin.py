from django.contrib import admin
from .models import Todo,Tutorial

class TodoAdmin(admin.ModelAdmin):
  list_display = ('title', 'description', 'completed')

# Register your models here.
admin.site.register(Tutorial)
admin.site.register(Todo, TodoAdmin)
