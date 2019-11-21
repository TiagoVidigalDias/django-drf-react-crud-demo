from rest_framework import serializers

from links.models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('original_url', )
        
class AddressReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'original_url', 'short_url', 'status', 'created_ts', 'updated_ts', )