import uuid
from django.db import models
from django.contrib.auth.models import User

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
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.name} - {self.category}"
    
# class Score(models.Model):
#     team1 = models.CharField(max_length=255)
#     team2 = models.CharField(max_length=255)
#     score1 = models.IntegerField()
#     score2 = models.IntegerField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.team1} {self.score1} - {self.score2} {self.team2}"
