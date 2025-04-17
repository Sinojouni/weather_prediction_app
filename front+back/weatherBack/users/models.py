from django.contrib.auth.models import User
from django.db import models

class UserModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=100)
    model_data = models.BinaryField()
    scaler_data = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
    @staticmethod
    def count_models(user):
        return UserModel.objects.filter(user=user).count()