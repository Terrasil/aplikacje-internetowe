# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 9

### Django + React (aplikacja CRUD)

#### Celem laboratorium było przerobienie tutorialu [BEZKODER](https://bezkoder.com/django-react-axios-rest-framework/)

### Elementy własne

#### Wykorzystałem Frontend z Aplikacji [SHOPPER](https://github.com/Terrasil/projektowanie-serwisow-www/tree/main/lab7) wykonanej na przedmiocie "Projektowanie serwisów WWW" (lab7)

#### Możliwe jest dodawanie grafiki danego produktu gtóra jest przesyłana do folderu 'files' (jako MEDIA) i ten że folder jest udostępniony przez urls.py aby móc besposrenio wykorzystać je do wyświetlania na stronie.

#### Dodatkowo wykorzystalem filtry do Django REST Framework aby stworzyć wyszukiwanie danego produktu (wykorzystany model Tutorial jak baza produktu)

### Przygotowania

#### Instalacja pakietów

```
pip install djangorestframework
```
```
pip install djangorestframework-filters
```
```
pip install django-cors-headers
```

#### Ustawienia aplikacji 
*(istotne zmiany)*
 ```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Django REST framework
    'rest_framework',
    'django_filters',
    # Tutorials application 
    'tutorials.apps.TutorialsConfig',
    # CORS
    'corsheaders',
]

// pominięty kod

REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.MultiPartParser',
    ),
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
}
MIDDLEWARE = [
    # CORS
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # Django Standard Middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# CORS
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8081',
    'http://localhost:8080',
    'http://localhost:3000',
)

// pominięty kod

MEDIA_URL = '/files/'
MEDIA_ROOT = os.path.abspath(os.path.join(BASE_DIR, 'files'))

```
#### Udostępnienie folderu MEDIA (tutaj files)
```python
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

#### API Rest
```python
urlpatterns = [ 
    path('api/tutorials', views.PostView.as_view(), name='posts_list'), <<-- lista wszystkich objektów
    path('api/tutorials/', views.SearchPostsView.as_view(), ),          <<-- wyszukiwanie po tytule
    path('api/tutorials/<int:pk>/', PostDetail.as_view()),              <<-- wyświetlanie konkretnego
]
```

#### Viewsy
```python
class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    //zwracanie objektu
    def get(self, request, *args, **kwargs):
        posts = Tutorial.objects.all()
        serializer = TutorialSerializer(posts, many=True)
        return Response(serializer.data)

    //wysyłanie
    def post(self, request, *args, **kwargs):
        posts_serializer = TutorialSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    //usuwanie
    def delete(self, request, *args, **kwargs):
        count = Tutorial.objects.all().delete()
        return Response({'message': '{} Tutorials were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

//wyswietlanie listy (wszystkie)
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer

//wykorzystanie filtrów
class SearchPostsView(generics.ListAPIView):
    search_fields = ['title']
    filter_backends = (filters.SearchFilter,)
    queryset = Tutorial.objects.all()
    serializer_class = TutorialSerializer
```

#### Axios
```python
import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:8080/api",
  headers: {
    'content-type': 'multipart/form-data',
  }
});
```

### Problem z CORS (XMLHttpRequest) 

Problem moża obejść za pomocą wtyczki do Microsoft EDGE [CORS Unblock](https://microsoftedge.microsoft.com/addons/detail/cors-unblock/hkjklmhkbkdhlgnnfbbcihcajofmjgbh)

![rozwiazanie problemu](https://i.imgur.com/N4r3WH4.png)

#### Przedstawienie wizualne (Aplikacja React CRUD)

--------

### Django REST Framework API

#### Wywietlanie wszystkich rekordów

![1](https://i.imgur.com/AqLmJrq.png)

#### Efekt na stronie

![2](https://i.imgur.com/80N8GTh.png)

#### Dane otrzymane z API

![3](https://i.imgur.com/Dyar0fc.png)

--------

### Wykorzystanie Django REST Framework Filters do wykonania wyszukiwarki

#### Wartości zwracane przez API

![4](https://i.imgur.com/umQMXrr.png)

#### Efekt na stronie

![5](https://i.imgur.com/wmki3H0.png)

#### Dane otrzymane z API w podglądzie konsoli

![6](https://i.imgur.com/hvjBamI.png)

--------

### Edytowanie rekordu/objektu (Produktu)

#### Podgląd (frontend)

![7](https://i.imgur.com/pRcSD0s.png)

#### Wyświetlanie możliwych akcji

![8](https://i.imgur.com/Hk4r0Yw.png)

--------

### Dodawanie (Tworzenie) nowego produktu i dodanie na strone

#### Formularz identyczny jak przy edycji jednak z możliwością jedynie Zapisania (w domysle w bazie)

![9](https://i.imgur.com/6iGMg3c.png)

#### Informacja o poprawnym dodaniu (identyczna w przypadku Edycji [publish/delete/update] )

![10](https://i.imgur.com/UUB8Xsq.png)

#### Dodany element po stronie... strony
![11](https://i.imgur.com/2MtW5vs.png)

#### Widok z poziomu REST Framework'u
![12](https://i.imgur.com/mdYbHJO.png)

--------

#### Strona przystosowana do Light/Dark Mode

![13](https://i.imgur.com/CF3CZdL.png)
