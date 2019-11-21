from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response

from .models import Address
from .serializers import *
from .permissions import *
from .tasks import *

# Create your views here.
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    allowed_methods = ('GET', 'POST', 'PUT', 'DELETE')
    #permission_classes = (IsAuthenticated, IsAddressUser)
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return AddressReadSerializer
        return AddressSerializer
    
    def perform_create(self, serializer):
        obj = serializer.save(user=self.request.user)
        generate_short_url.delay(obj.id)
        
    def perform_update(self, serializer):
        obj = serializer.save(updated_ts=timezone.now(), status='Pending')
        generate_short_url.delay(obj.id)
        
        
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
                    status=HTTP_200_OK)