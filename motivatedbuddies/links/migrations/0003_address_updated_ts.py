# Generated by Django 2.2.7 on 2019-11-20 18:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('links', '0002_auto_20191114_1052'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='updated_ts',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]