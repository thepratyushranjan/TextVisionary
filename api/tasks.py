from celery import shared_task
import requests
from io import BytesIO
from django.core.files.base import ContentFile
from .models import GeneratedImage

@shared_task
def generate_image(text):
    api_key = 'sk-6ZsnvzJIBMC8FwhzBdoZiVIrWMOSpoxBfpfP5eNraoqMe1bH'  # Replace with your actual API key
    url = 'https://api.stability.ai/v2beta/stable-image/generate/ultra'
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Accept': 'image/*',
    }

    files = {'none': ''}  # Adjust this if necessary based on the API's requirements
    data = {
        'prompt': text,
        'output_format': 'webp',
    }

    response = requests.post(url, headers=headers, files=files, data=data)
    
    if response.status_code == 200:
        # Save the generated image to the database
        image_file = ContentFile(response.content, f"{text}.webp")
        generated_image = GeneratedImage.objects.create(
            text=text,
            image_file=image_file
        )

        return {
            'text': text, 
            'image_url': generated_image.image_file.url
        }
    else:
        # Handle error appropriately
        error_message = response.json()
        return {'error': error_message}

