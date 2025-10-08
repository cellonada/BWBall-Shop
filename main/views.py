import datetime
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.core import serializers
from django.shortcuts import render, redirect, get_object_or_404
from main.models import Product
from main.forms import ProductForm
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST

# Create your views here.
@login_required(login_url='/login')
def show_main(request):
    hot_products = Product.objects.filter(is_favorite=True)[:3]
    context = {
        'appName' : "BW Ball-Shop",
        'name' : 'Zhafira Celloanada',
        'npm' : '2406495842',
        'class' : 'PBP F',
        'current_user' : request.user.username,
        'hot_products' : hot_products,
        'last_login': request.COOKIES.get('last_login', 'Never')
    }
    return render(request, "main.html", context)

def product_list(request):
    filter_type = request.GET.get("filter", "favorite") #ini di set defaultnya bakalan nampilin produk yg favorite
    if filter_type == "favorite":
        products = Product.objects.filter(is_favorite=True)
    elif filter_type == "my":
        products = Product.objects.filter(user=request.user)
    else:
        products = Product.objects.all()

    return render(request, "product_list.html", {"products":products, "filter_type":filter_type})

@login_required(login_url='/login')
def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    context = {
        'product' : product
    }
    return render(request,"product_detail.html", context)

def score_board(request):
    return render(request, "score_board.html")

def show_xml(request):
    list_produk = Product.objects.all()
    xml_data = serializers.serialize("xml", list_produk)
    return HttpResponse(xml_data, content_type="application/xml")

def show_json(request):
    filter_type = request.GET.get("filter", "all")
    products = Product.objects.all()

    if filter_type == "my" and request.user.is_authenticated:
        products = products.filter(user=request.user)
    elif filter_type == "favorite":
        products = products.filter(is_favorite=True)
    data = []
    for p in products:
        data.append({
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "stock": p.stock,
            "description": p.description,
            "is_favorite": p.is_favorite,
            "thumbnail": p.thumbnail,
            "user_username": p.user.username if p.user else None,
        })

    return JsonResponse({
        "current_user": request.user.username if request.user.is_authenticated else None,
        "products": data,
    })

def show_xml_by_id(request, product_id):
   try:
       product_item = Product.objects.filter(pk=product_id)
       xml_data = serializers.serialize("xml", product_item)
       return HttpResponse(xml_data, content_type="application/xml")
   except Product.DoesNotExist:
       return HttpResponse(status=404)
   
def show_json_by_id(request, product_id):
   try:
       product_item = Product.objects.get(pk=product_id)
       json_data = serializers.serialize("json", [product_item])
       return HttpResponse(json_data, content_type="application/json")
   except Product.DoesNotExist:
       return HttpResponse(status=404)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        # Jika request AJAX
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            if password1 != password2:
                return JsonResponse({'success': False, 'message': 'Passwords do not match.'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'Username already exists.'}, status=400)

            User.objects.create_user(username=username, password=password1)
            return JsonResponse({'success': True, 'message': 'Account created successfully! Please login.'})

        # fallback ke form biasa (non-AJAX)
        else:
            form = UserCreationForm(request.POST)
            if form.is_valid():
                form.save()
                messages.success(request, 'Your account has been successfully created!')
                return redirect('main:login')
            return render(request, 'register.html', {'form': form})

    # GET
    return render(request, 'register.html', {'form': UserCreationForm()})

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        # Jika request AJAX
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            if user is not None:
                login(request, user)
                response = JsonResponse({
                    'success': True,
                    'message': 'Login successful!',
                    'redirect_url': reverse('main:show_main')
                })
                response.set_cookie('last_login', str(datetime.datetime.now()))
                return response
            else:
                return JsonResponse({'success': False, 'message': 'Invalid username or password.'}, status=400)

        # fallback ke login biasa
        else:
            form = AuthenticationForm(data=request.POST)
            if form.is_valid():
                user = form.get_user()
                login(request, user)
                response = HttpResponseRedirect(reverse('main:show_main'))
                response.set_cookie('last_login', str(datetime.datetime.now()))
                return response

    return render(request, 'login.html', {'form': AuthenticationForm()})

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from main.models import Product

# Ambil semua produk atau filter
@login_required(login_url='/login')
def get_products(request):
    filter_type = request.GET.get('filter', 'all')
    
    if filter_type == 'my':
        products = Product.objects.filter(user=request.user)
    elif filter_type == 'favorite':
        products = Product.objects.filter(is_favorite=True)
    else:
        products = Product.objects.all()

    data = [
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "stock": p.stock,
            "description": p.description,
            "category": p.category,
            "thumbnail": p.thumbnail,
            "is_favorite": p.is_favorite,
            "user_id": p.user.id if p.user else None,
            "user_username": p.user.username if p.user else None
        } for p in products
    ]
    return JsonResponse({"products": data, "current_user": request.user.username})

# Create product
@login_required(login_url='/login')
def create_product_ajax(request):
    if request.method == "POST":
        name = request.POST.get('name')
        price = request.POST.get('price')
        stock = request.POST.get('stock')
        description = request.POST.get('description')
        category = request.POST.get('category')
        thumbnail = request.POST.get('thumbnail')
        is_favorite = request.POST.get('is_favorite') == 'on'

        product = Product.objects.create(
            name=name, price=price, stock=stock, description=description,
            category=category, thumbnail=thumbnail, is_favorite=is_favorite,
            user=request.user
        )
        return JsonResponse({"status":"success", "product_id": product.id})

# Update product
@login_required(login_url='/login')
def update_product_ajax(request, id):
    product = get_object_or_404(Product, pk=id)
    if product.user != request.user:
        return JsonResponse({"status": "error", "message": "Not allowed"}, status=403)

    product.name = request.POST.get('name')
    product.price = request.POST.get('price')
    product.stock = request.POST.get('stock')
    product.description = request.POST.get('description')
    product.category = request.POST.get('category')
    product.thumbnail = request.POST.get('thumbnail')
    product.is_favorite = request.POST.get('is_favorite') == 'on'
    product.save()
    return JsonResponse({"status":"success"})

# Delete product
@login_required(login_url='/login')
def delete_product_ajax(request, id):
    product = get_object_or_404(Product, pk=id)
    if product.user != request.user:
        return JsonResponse({"status": "error", "message": "Not allowed"}, status=403)
    product.delete()
    return JsonResponse({"status":"success"})


