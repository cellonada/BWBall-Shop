from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'category', 'is_favorite', 'user')
    list_filter = ('category', 'is_favorite')
    search_fields = ('name', 'category')