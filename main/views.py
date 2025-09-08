from django.shortcuts import render
from .models import Product

# Create your views here.
def show_main(request):
    context = {
        'name' : 'Zhafira Celloanada',
        'class' : 'PBP C'
    }
    return render(request, "main.html", context)