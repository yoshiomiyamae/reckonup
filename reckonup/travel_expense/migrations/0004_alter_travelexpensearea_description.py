# Generated by Django 4.0 on 2022-01-02 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travel_expense', '0003_alter_destination_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travelexpensearea',
            name='description',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
