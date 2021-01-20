from django.db import models

def upload_path(instance, filename):
    return '/'.join(['phones',str(instance.title),filename])

class Tutorial(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=1000,blank=False, default='')
    price = models.FloatField(blank=False, default=0)
    published = models.BooleanField(default=False)
    upload = models.ImageField(blank=True, null=True, upload_to=upload_path)

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.title