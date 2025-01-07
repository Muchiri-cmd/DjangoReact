from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [ "id" , "username" , "password"]
    #no one should be able to read the password
    extra_kwargs = {"password": {"write_only": True }}

  
  #serializer looks at all fields on user model and ones specified and make sure they are validated
  # it then passes it as validated data
  def create(self,validated_data):
    #create new user
    user = User.objects.create_user(**validated_data)
    return user

class NoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Note
    fields = ["id","title" ,"content","created_at","author"]
    #you cant write who is the author just read coz its set
    extra_kwargs = {"author": {"read_only": True}}
    

