import uuid
from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    thumbnail = models.URLField()
    category = models.CharField(max_length=255)
    is_featured = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.category}"
