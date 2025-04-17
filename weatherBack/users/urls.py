from django.urls import path
from .views import signup, logout,get_user,get_model,save_model,get_user_models,delete_model,MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('signup/', signup),
    path('logout/', logout),
    path('user/', get_user),
    path('save_model/', save_model),
    path('get_model/<str:city>/', get_model),
    path('delete_model/<str:city>/', delete_model),
    path('user/models/', get_user_models),
]
