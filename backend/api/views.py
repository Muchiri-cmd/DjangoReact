from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Note

# Create your views here.
class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all() #list of objects to look at when creating a new one to ensure we dont create existing user
  serializer_class = UserSerializer #tells the view what data we need to make new user
  permission_classes = [AllowAny] #who can call this view, anyone even those not authenticated

class NoteListCreate(generics.ListCreateAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user)

  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(author=self.request.user)
    else:
      print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user)

