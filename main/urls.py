from django.urls import path
from main.views import show_main,product_list, score_board, show_xml, show_json
from main.views import show_json_by_id,show_xml_by_id, register, login_user, logout_user
from main.views import create_product_ajax, update_product_ajax, delete_product_ajax
from main.views import get_products, show_product

app_name = 'main' #iden

urlpatterns = [
    path('', show_main, name='show_main'),
    path('products/', product_list, name='product_list'),
    path('product/<int:id>/',show_product, name='product_detail'),
    path("score-board/",score_board, name="score_board"),

    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<int:product_id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:product_id>/', show_json_by_id, name='show_json_by_id'),

    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
 
   path('ajax/products/get/', get_products, name='get_products'),
    path('ajax/products/create/', create_product_ajax, name='create_product_ajax'),
    path('ajax/products/update/<int:id>/', update_product_ajax, name='update_product_ajax'),
    path('ajax/products/delete/<int:id>/', delete_product_ajax, name='delete_product_ajax'),
]
