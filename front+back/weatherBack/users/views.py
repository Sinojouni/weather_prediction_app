from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import UserModel
import base64


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    return Response({
        "username": request.user.username,
        "email": request.user.email
    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_model(request):
    try:
        username = request.user.username
        city = request.data.get("city")
        model_data = request.data.get("model_data")
        scaler_data = request.data.get("scaler_data")

        if not username or not city or not model_data or not scaler_data:
            return Response({"error": "Missing data"}, status=400)

        user = User.objects.get(username=username)

        if UserModel.objects.filter(user=user).count() >= 3:
            return Response({"error": "Max 3 models allowed"}, status=400)

        model_binary = bytes(model_data)
        scaler_binary = bytes(scaler_data)

        UserModel.objects.create(user=user, city=city, model_data=model_binary, scaler_data=scaler_binary)

        return Response({
            "message": "Model and scaler saved successfully",
            "total_models": UserModel.count_models(user)
        })
    
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    except Exception as e:
        return Response({"error": f"Unexpected error: {str(e)}"}, status=500)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_model(request, city):
    try:
        user = request.user
        user_model = UserModel.objects.get(user=user, city=city)
        return Response({"model_data": list(user_model.model_data),"scaler_data": list(user_model.scaler_data)})
    except UserModel.DoesNotExist:
        return Response({"error": "Model not found"}, status=404)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_models(request):
    username = request.user.username
    user_models = UserModel.objects.filter(user__username=username).values("city", "created_at")
    return Response({"models": list(user_models)})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_model(request, city):
    try:
        username = request.user.username
        user = User.objects.get(username=username)
        user_model = UserModel.objects.get(user=user, city=city)
        user_model.delete()
        return Response({"message": "Model deleted successfully"})
    except UserModel.DoesNotExist:
        return Response({"error": "Model not found"}, status=404)




