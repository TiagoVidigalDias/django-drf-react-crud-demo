from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers

from .views import *

#router = routers.DefaultRouter(trailing_slash=False)
router = routers.SimpleRouter()
router.register(r'addresses', AddressViewSet)

addresses_list = AddressViewSet.as_view({
    'get': 'list',
    'post': 'create',
    'put': 'update',
    #'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [

    path('login/', login),
    url(r'^', include(router.urls)),
    #path('addresses/', addresses_list),
    
]