from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import GeneratedImage
from .serializers import GeneratedImageSerializer
from .tasks import generate_image

class GenerateImagesView(APIView):
    def post(self, request):
        # Extract prompts from the request data
        prompts = request.data.get('prompts', [])
        
        if not prompts:
            return Response({'error': 'No prompts provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Trigger Celery tasks
        tasks = [generate_image.delay(prompt) for prompt in prompts]
        
        # Collect results from Celery tasks
        results = []
        for task in tasks:
            result = task.get(timeout=60)  # Adjust timeout as needed
            results.append(result)
        
        # Retrieve and serialize the generated images from the database
        images = GeneratedImage.objects.filter(text__in=prompts)
        image_serializer = GeneratedImageSerializer(images, many=True)
        
        return Response({'results': image_serializer.data}, status=status.HTTP_200_OK)

class ImageDetailView(APIView):
    def get(self, request, pk):
        try:
        
            image = GeneratedImage.objects.get(pk=pk)
        except GeneratedImage.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GeneratedImageSerializer(image)
        return Response({'result': serializer.data}, status=status.HTTP_200_OK)