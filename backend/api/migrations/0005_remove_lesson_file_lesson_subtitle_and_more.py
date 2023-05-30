# Generated by Django 4.2.1 on 2023-05-29 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_lesson_content_lesson_file_alter_lesson_url_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='file',
        ),
        migrations.AddField(
            model_name='lesson',
            name='subtitle',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AddField(
            model_name='lessoncontents',
            name='files',
            field=models.FileField(blank=True, null=True, upload_to='media/'),
        ),
    ]