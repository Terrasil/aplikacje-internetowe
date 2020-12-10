from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model 

from rest_framework import viewsets
from rest_framework import generics, permissions
from .models import Post

from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, UserSerializer
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import authentication, permissions
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.renderers import HTMLFormRenderer,JSONRenderer,BrowsableAPIRenderer 

class PostList(APIView):
    serializer_class = PostSerializer
    renderer_classes = (BrowsableAPIRenderer, JSONRenderer, HTMLFormRenderer)

    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        snippets = Post.objects.all()
        serializer = PostSerializer(snippets,many=True)
        html = Response(serializer.data)
        if request.COOKIES.get('wizyty'): #jeżeli już istnieje (rekord)
            value = int(request.COOKIES.get('wizyty'))
            html.set_cookie('wizyty', value + 1) #ilość wizyt + 1
            html.set_cookie('welcomeText', 'Witaj ponownie! To twoja ' + str(value+1) + " wizyta!")# +1 bo value posiada cały czas poprzednią wartość odwiedzin
            return html
        else: #pierwsze odzwiedziny
            text = "Witaj!"
            html.set_cookie('wizyty', 1)
            html.set_cookie('welcomeText', text)
            return html

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class UserList(generics.ListCreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer