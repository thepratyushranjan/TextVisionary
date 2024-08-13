from django.db import models

class GeneratedImage(models.Model):
    text = models.CharField(max_length=255)
    image_file = models.ImageField(upload_to='generated_images/')
    created_at = models.DateTimeField(auto_now_add=True)
