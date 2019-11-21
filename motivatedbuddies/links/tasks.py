from celery.decorators import task

from random import choice

from .models import Address
from string import ascii_uppercase

@task(name="generate_short_url")
def generate_short_url(address_id):
    address = Address.objects.get(pk=address_id)
    
    # On a real case one would invoke an API like Bit.ly for generation.
    # For demo purposes, I'm just generating a random six character string
    random_url_key = ''.join(choice(ascii_uppercase) for i in range(6))
    short_url = 'https://motivated.lnk/'+random_url_key
    address.short_url = short_url
    address.status = 'Finished'
    address.save()
    
    print('generate_short_url :: ID #'+str(address_id) +' :: Generated short URL '+short_url)