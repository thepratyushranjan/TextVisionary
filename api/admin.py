from django.contrib import admin
from .models import GeneratedImage

class GeneratedImageAdmin(admin.ModelAdmin):
    list_display = ('text', 'image_file', 'created_at') 
    search_fields = ('text',) 
    list_filter = ('created_at',) 

# Register the model with the admin interface
admin.site.register(GeneratedImage, GeneratedImageAdmin)
