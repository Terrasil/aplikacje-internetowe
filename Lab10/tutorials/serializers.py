from rest_framework import serializers 
from tutorials.models import Tutorial
from .models import Todo
 
class TutorialSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Tutorial
        fields = ('id',
                  'title',
                  'description',
                  'price',
                  'published',
                  'upload',
                )

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed') #<---- te pola mają być wyświetlane