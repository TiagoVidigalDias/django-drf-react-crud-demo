from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers

from .views import *

router = routers.SimpleRouter()
router.register(r'addresses', AddressViewSet)

urlpatterns = [
    path('login/', login),
    url(r'^', include(router.urls)),
]