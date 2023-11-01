# Generated by Django 4.2.1 on 2023-10-25 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_lessoncontent_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageMedia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_link', models.ImageField(upload_to='media')),
            ],
        ),
        migrations.AlterField(
            model_name='lessoncontent',
            name='images',
            field=models.ManyToManyField(blank=True, null=True, related_name='lesson_contents', to='api.imagemodel'),
        ),
    ]