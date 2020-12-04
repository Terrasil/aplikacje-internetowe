# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 4
Repozytorium zawiera wynik (program) z Laboratorium 4. Celem było zapoznanie się z mechanizmem DRF (tutaj dwa API, Redoc'iem i Swagger'em). 

DRF (Django REST framework) jest dużym udogodnieniem gdyż skraca czas tworzenia aplikacji oraz zmniejsza ilość linii kodu.

## APIv1 - Post - Posty

#### Dodanie nowego postu APIv1 jako Administrator
![Dodanie nowego postu APIv1](https://i.imgur.com/tUjlosN.png)

#### Podgląd po dodaniu jako Administrator
![Po dodaniu nowgo postu APIv1](https://i.imgur.com/O6R9nlD.png)

#### Lista postów APIv1 jako Administrator
![Lista postów APIv1](https://i.imgur.com/6UfQ2m1.png)

#### Podgląd postu ID4 w APIv1 jako Administrator
![Podgląd postu nr 4](https://i.imgur.com/Z30pYqR.png)

#### Podgląd postu ID4 w APIv1 jako Użytkownik
![Podgląd postu nr 4 user](https://i.imgur.com/ww4dm4x.png)

## APIv2 - Testowa - Książki

#### Dodanie nowej książki APIv2 jako Administrator
![Dodanie nowej książki APIv2](https://i.imgur.com/m4q4hCU.png)

#### Lista książek APIv2 jako Administrator
![Lista książek APIv2](https://i.imgur.com/yG7hx4t.png)

#### Podgląd książki ID4 w APIv2 jako Administrator
![Podgląd książki nr 4](https://i.imgur.com/Yiwlz19.png)

#### Podgląd książki ID4 w APIv2 jako Użytkownik
![Podgląd książki nr 4 user](https://i.imgur.com/iJPnkMJ.png)

#### Dodatkowo - Filtry
Pakiet **django-filters**

Aby skorzystać z tego pakietu należy wykonać poniższe kroki:

- W **views.py** należy dodać:

    filter_backends = [filters.SearchFilter, filters.OrderingFilter] 
    
    search_fields = ['title'], 
    
    ordering_fields = ['title'] 
    
- W **settings.py**  należy dodać:

    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend',]
    
Filtrowanie i sortowanie odbywa się po parametrze 'title'

![Filtrowanie po tytule](https://i.imgur.com/OMeXbwo.png)

## Redock

#### Podgląd Redoc'a
![Podgląd Redoc'a](https://i.imgur.com/fSOoKdK.png)

## Swagger

#### Podgląd Swagger'a
![Podgląd Swagger'a](https://i.imgur.com/igDaLT1.png)
#### Podgląd modelu POST 'v1_create' dla APIv1
![Podgląd metody POST dla APIv1](https://i.imgur.com/MJOHReU.png)
