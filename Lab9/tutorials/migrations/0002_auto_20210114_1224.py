# Generated by Django 3.1.4 on 2021-01-14 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tutorials', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tutorial',
            name='description',
            field=models.CharField(default='', max_length=1000),
        ),
    ]