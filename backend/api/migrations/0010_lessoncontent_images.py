# Generated by Django 4.2.1 on 2023-10-23 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_imagemodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='lessoncontent',
            name='images',
            field=models.ManyToManyField(related_name='lesson_contents', to='api.imagemodel'),
        ),
    ]