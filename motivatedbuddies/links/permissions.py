from rest_framework import permissions
from .models import Address

class IsAddressUser(permissions.BasePermission):
    """
    Custom permission to only allow the User to see its Addresses
    """
    
    def has_object_permissions(self, request, view, obj):
        if obj.user == request.user:
            return True
        return False
        