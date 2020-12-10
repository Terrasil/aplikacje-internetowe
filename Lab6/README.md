# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 6

### ViewSets

Korzystanie z **ViewSets'ów** pozwala uprościć kod (zmniejszyć jego objętość). Jest to spowodowane tym że nie jest konieczne pisanie osobnych klas do wyświetlenia pojedyńczego postu i ich listy. Wystarczy stworzyć pojedyńczą klasę (jak poniżej) aby to obsłużyć. Dodatkowo nie jest konieczne podawanie scieżek w **urlpatterns** jenak trzeba skorzystać z **Router'ów**.

```python
class BookViewSet(viewsets.ModelViewSet): 
    permission_classes = (IsAuthorOrReadOnly,IsAuthenticated)
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['title']

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
```

### Routers

Możemy wykorzystać **Routers'y** aby w prosty sposób wygenerować sobie ścieszki a następnie umieścić je w **urlpatterns**. Stworzyłem nowy objekt wykorzystując funkcję **DefaultRouter()**, można też skorzystać z **SimpleRouter()**. Następnie wykorzystujemy metodę **register** poprzednio utworzonego objektu. Kolejnym krokiem jest przekazanie począteku naszej scieżki i dany **ViewSet**.

```python
#stworzenie nowego Routera(obiektu klasy Router)
router = DefaultRouter() #lub SimpleRouter()

#przekazanie do naszego nowo utowrzonego Routera wcześniej utworzonych viewsetów
#podajemu mu równierz jak ma nazywać się początek scieżki
router.register('users', UserViewSet, basename='users')
router.register('', BookViewSet, basename='books')

#na koniec wywoływana metoda która tworzy za nas gotowy urlpatterns
urlpatterns = router.urls
```

### Uwierzytelnianie 

**Session** 

W przypadku uwierzytelniania opartego na sesjach serwer wykonuje całą pracę po stronie serwera. Klient uwierzytelnia się za pomocą swoich poświadczeń i otrzymuje **sessionid** (który jest przechowywany w pliku cookie) i dołącza go do każdego kolejnego żądania wychodzącego.

**Token** 

W przypadku uwierzytelniania opartego na tokenach żadna sesja nie jest utrwalana po stronie serwera (bezstanowa). Pierwsze kroki są takie same. Poświadczenia są wymieniane na token, który jest następnie dołączany do każdego kolejnego żądania (może być również przechowywany w pliku cookie). Token jest zaszyfrowanym zbiorem wszystkich najistotniejszych informacji o użytkowniku.

Przykład: *token = user_id | expiry_date | HMAC (user_id | expiry_date, x)* 

x - jest znane jedynie przez dany serwer

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        #Ustawiony domyślnie 'rest_framework.permissions.AllowAny',
        'rest_framework.permissions.IsAuthenticated',
        ],
        
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework.authentication.SessionAuthentication', #Uwierzytelnianie za pomocą sesji
            #'rest_framework.authentication.BasicAuthentication',
            'rest_framework.authentication.TokenAuthentication',  #Uwierzytelnianie za pomocą token'u
        ],
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend',],
}
```

### Sprawdzanie działania uwierzytelniania za pomocą Token'ów

#### Należy utworzyć nowego użytkownika aby ten miał przypisany do siebie token. 

(Poprzedni użytkownicy nie mają swoich tokenów gdyż przy ich rejestrowaniu nie były utworzone).

![Rejestracja](https://i.imgur.com/IiDqMbw.png)

#### Po zarejestrowaniu użytkownik otrzymał token

![Token](https://i.imgur.com/rO6HsoQ.png)

#### Dodatkowo podglą w panel administratora

![Admin Panel](https://i.imgur.com/l7pKMMm.png)

#### Przykładowy problem z uwierzytelnianiem (użytkownik niezalogowany)

![Niezalogowany](https://i.imgur.com/ejtUY79.png)


### Pliki Cookies

Pliki **cookies** to informacje w postaci pliku tekstowego, które przechowywane są na komputerze danego użytkownika.Dodawane są przez witryny jakie odwiedzał. Mają one na celu przechowanie i zapamiętywanie ustawień użytkownika, które dotyczą przeglądanych przez niego stron itp.

Mój portal zapisuje do plików **cookies** informacje o ilości wizyt w 'wizyty' oraz wiadomość powitalną/tekstową w postaci "Witaj ponownie! To twoja {x} wizyta!" gdzie x to numer wizyty. Jeżeli użytkownik jest pierwszy raz na stronie to tworzone są dane odpowiednio o wartości '1' i 'Witaj!'

```python
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
```

#### Pierwsza wizyta

![Pierwsza wizyta](https://i.imgur.com/bLzciY5.png)

#### Kolejna wizyta

Wizyta numer 4.

![Czwarta wizyta](https://i.imgur.com/WQvuINy.png)
