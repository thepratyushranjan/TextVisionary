from django.urls import path
from .views import GenerateImagesView, ImageDetailView

urlpatterns = [
    path('generate-images/', GenerateImagesView.as_view(), name='generate_images'),
    path('images/<int:pk>/', ImageDetailView.as_view(), name='image-detail'),
]
