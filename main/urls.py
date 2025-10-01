from django.urls import path
from main.views import show_main,add_product,product_list, show_product, score_board, show_xml, show_json
from main.views import show_json_by_id,show_xml_by_id, register, login_user, logout_user, edit_product
from main.views import delete_product

app_name = 'main' #iden

urlpatterns = [
    path('', show_main, name='show_main'),
    path('products/', product_list, name='product_list'),
    path('add-product/', add_product, name='add_product'),
    path('details/<str:id>', show_product, name='product_detail'),
    path("score-board/",score_board, name="score_board"),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<int:product_id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:product_id>/', show_json_by_id, name='show_json_by_id'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('products/<int:id>/edit', edit_product, name='edit_product'),
    path('products/<int:id>/delete', delete_product, name='delete_product'),
]
