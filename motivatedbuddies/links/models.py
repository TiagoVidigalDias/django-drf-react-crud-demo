from django.db import models
from django.conf import settings

# Create your models here.
class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    original_url = models.CharField(max_length=4000, null=True) 
    short_url = models.CharField(max_length=32) # Assuming this is a service delivered by your application, format: https://motivated.lnk/XXXXXX
    status = models.CharField(max_length=16, default='Pending') # Should be a SmallIntField with a map of statuses
    created_ts = models.DateTimeField(auto_now_add=True)
    updated_ts = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.id)+' : '+str(self.user)+ ' : '+self.status+' : '+self.original_url+' » '+str(self.short_url)