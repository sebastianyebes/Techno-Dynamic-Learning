# Generated by Django 4.2.1 on 2023-05-29 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_lesson_content_lesson_subtitle_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='title',
            field=models.CharField(default='', max_length=50),
        ),
    ]