from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import render, redirect, get_object_or_404
from main.models import Product
from main.forms import ProductForm

# Create your views here.
def show_main(request):
    context = {
        'appName' : "BW Ball-Shop",
        'name' : 'Zhafira Celloanada',
        'class' : 'PBP C',
    }
    return render(request, "main.html", context)

def product_list(request):
    filter_type = request.GET.get("filter", "favorite") #ini di set defaultnya bakalan nampilin produk yg favorite
    if filter_type == "favorite":
        products = Product.objects.filter(is_favorite=True)
    elif filter_type == "unfavorite":
        products = Product.objects.filter(is_favorite=False)
    else:
        products = Product.objects.all()

    return render(request, "product_list.html", {"products":products, "filter_type":filter_type})

def add_product(request):
    form = ProductForm(request.POST or None)
    if form.is_valid() and request.method == "POST":
        form.save()
        return redirect('main:show_main')
    context = {'form' : form}
    return render(request, "add_product.html", context)

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
    list_produk = Product.objects.all()
    json_data = serializers.serialize("json", list_produk)
    return HttpResponse(json_data, content_type="application/json")

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
   
#tes