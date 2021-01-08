# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 7

### Python + Redis + Django

#### Zadania Redis:

***Wymagane moduły do laboratorium:***
  - pip install **redis**
  - pip install **Pillow**
  - pip install **django_celery_beat**
  - pip install **django-widget-tweaks**
  - pip install **gevent**
  - pip install **django-celery**

Zadanie 1 - Wprowadzenie czym jest Redis.

>Nazwa Redis pochodzi od „Remote Dictionary Server”. A samo rozwiązanie to po prostu baza danych. Dokładniej baza typu NoSQL, przechowująca dane w formacie „klucz-wartość”.

>Historia tego typu baz danych jest dość zabawna. Najpierw były postrzegane jako ciekawostka, by wraz z biegiem czasu, zacząć pojawiać się prawie wszędzie. Nawet tam, gdzie kompletnie nie pasują.

oraz zastosowanie.

Zadanie 2 - Instalacja i uruchomienie Redis Server

Pliki serwera:

![folder redis](https://i.imgur.com/RdRETyi.png)

Uruchomienie

![uruchomienie redis](https://i.imgur.com/CNOdWuv.png)

Zadanie 2 część 1 - Tworzenie pary klucz wartość oraz odpieranie ich (zwracanie)

```python
# Zadanie 2 cz.1
from redis import Redis

# Tworzenie pary klucz i wartosc ktora zwroci odpowiedz jako
redis_connection = Redis()

# Ciag znaków
key = "Klucz"
value = "Wartosc"

redis_connection.set(key, value)
print(redis_connection.get(key))
```

![zad2-1](https://i.imgur.com/i3gkGoU.png)

Zadanie 2 część 2 - Dekodowanie 

```python
# Zadanie 2 cz.2
from redis import Redis

# Tworzenie pary klucz, wartosc gdzie zwraca nam string
redis_connection = Redis(decode_responses=True)  # Zmieniamy odkodowywanie odpowiedzi na TRUE

key = "Klucz"
value = "Wartosc"

redis_connection.set(key, value)
print(redis_connection.get(key))
```

![zad2-2](https://i.imgur.com/b48V2Y9.png)

Zadanie 2 część 3 - Dołączenie do wartości innej *(tu string)*

```python
# Dołączanie do istniejącej wartości stringa
redis_connection = Redis(decode_responses=True)
key = "Klucz"
value = "Wartosc"

redis_connection.set(key, value)
print(redis_connection.get(key))

redis_connection.append(key,"Redis rozpoczecie polaczenia")
print(redis_connection.get(key))

# Usunięcie istniejącego klucza i wartości
redis_connection.delete(key)
print(redis_connection.get(key))
```

![zad2-3](https://i.imgur.com/qo8rJq4.png)

Zadanie 2 część 4 - Operacje na wartościach *(dodawanie i odejmowanie)*

```python
# Zadanie 2 cz.4
from redis import Redis

# Dodawanie i odejmowanie wartości od typu liczbowego
redis_connection = Redis(decode_responses=True)

key = "Obliczenia"
value = 1000

redis_connection.set(key, value)
print(redis_connection.get(key))
print("Zwiekszanie "+str(redis_connection.incr(key,100))) 
print("Zmniejszanie "+str(redis_connection.decr(key,250))) 
```

![zad2-4](https://i.imgur.com/s9tV00W.png)

Zadanie 3 część 1 - Wyswietlanie listy

```python
# Zadanie 3 cz.1
from redis import Redis

# Kod w komentarzu blokowym tworzy listę a następnie wyświetla ją w przedziale

"""
#Przykład pierwszy
redis_connection = Redis(decode_responses=True)
list_key ="Pierwsza lista w Redisie"
redis_connection.rpush(list_key,1,2,3,4,5)
print(redis_connection.lrange(list_key,0, -1))
"""

"""
#Przykład drugi
redis_connection = Redis(decode_responses=True)
list_key ="Pierwsza lista w Redisie"
redis_connection.rpush(list_key,10,20,30,40,50)
print(redis_connection.lrange(list_key,1,3))
"""

# Metoda blokująca wykonywanie programu ``brpop``
redis_connection = Redis(decode_responses=True)
list_key ="kluczListy"
whileTrue:print(redis_connection.brpop(list_key))

# Program, po uruchomieniu, działa nieprzerwanie.
# Mamy tu doczynienia z nieskonczoną pętlą.

# Jeśli w liście nie ma elementów. 
    # Wywołanie ``brpop`` skutkuje blokadą programu, 
# Jeśli są, 
    # Pobiera ostatni element, 

# W naszym przypadku program, zapętla się, 
# pobierając wszystkie elementy i po ostatnim
# program jest blokowany.
```

![zad3-1](https://i.imgur.com/vuVcdC2.png)

Zadanie 3 część 2 - Wyswietlanie listy *(przedział)* oraz skrajne *(prawo i lewo -> pierwszy i ostatni)*

```python
# Zadanie 3 cz.2
from redis import Redis

# Pop
redis_connection = Redis(decode_responses=True)
list_key = "Pop"
redis_connection.lpush(list_key, 2, 4, 6, 8, 10)

# ``lpop`` i ``rpop`` zwraca lewy lub prawy skrajny element i go usuwa z listy
# print(redis_connection.lpop(list_key))
# ``lrange`
print(redis_connection.rpop(list_key))
print(redis_connection.lrange(list_key, 0, -1))

# ``lindex`` index skrajnego lewego elementu
# ``llen``
print(redis_connection.lindex(list_key, 3))
print(redis_connection.llen(list_key))
```

![zad3-2](https://i.imgur.com/rTMj2Is.png)

Zadanie 4 część 1 - Zbiory i ich sortowanie

```python
# Zadanie 4 cz.1
from redis import Redis
"""
# Dodanie i pobranie elementów do/ze zbiorów
redis_connection = Redis(decode_responses=True)
redis_connection.sadd("key","Witaj")
redis_connection.sadd("key","Priviet")
redis_connection.sadd("key","Hallo")
print(redis_connection.smembers("key"))

# Różnicę zbiorów możemy osiągnąć stosując polecenie SDIFF, 
# część wspólną zbiorów uzyskamy poleceniem SINTER 
# a suma zbiorów to polecenie SUNION.
"""

# Posortowane zbiory
"""
# Komendą ZADD dodajemy elementy a ZRANGE pobieramy je
redis_connection = Redis(decode_responses=True)
redis_connection.zadd("posortowanyZbiór",{"wartość1": 3})
redis_connection.zadd("posortowanyZbiór",{"wartość2": 200})
redis_connection.zadd("posortowanyZbiór",{"wartość3": -32})
redis_connection.zadd("posortowanyZbiór",{"wartość4": 56})
print(redis_connection.zrange("posortowanyZbiór",0, -1,withscores=True))
"""

# Zbiory o tej samej wadze
redis_connection = Redis(decode_responses=True)
redis_connection.zadd("posortowanyZbiór2",{"wartość5": 3})
redis_connection.zadd("posortowanyZbiór2",{"wartość2": 2})
redis_connection.zadd("posortowanyZbiór2",{"wartość3": 1})
redis_connection.zadd("posortowanyZbiór2",{"wartość1": 0})
print(redis_connection.zrange("posortowanyZbiór2",0, -1,withscores=True))
```

![zad4-1](https://i.imgur.com/eV0mxq4.png)

Zadanie 4 część 2 - HASH'e

```python
# Zadanie 4 cz.2
from redis import Redis

# HASH'e

# Czyli po prostu mapy czy też słowniki. 
# Tablice asocjacyjne. 
# Nazw jest dużo, ale idea ta sama – struktura danych 
# przechowująca klucze i odpowiadające im wartości.

redis_connection = Redis(decode_responses=True)
hash_key ='kluczHashu'
redis_connection.hset(hash_key,'pierwszyKlucz','pierwszaWartosc')
redis_connection.hset(hash_key,'drugiKlucz','drugaWartosc')

# Powyższy kawałek kodu pozwala 
# na stworzenie pod kluczem „test_hash” właśnie słownika,
# który będzie miał dwa klucze „key/key2” 
# o wartości „value/value2”

# Pobieranie i wyswietlanie "struktury"
print(redis_connection.hgetall(hash_key))
```

![zad4-2](https://imgur.com/khMJsnF.png)

Zadanie 5 - Kanały komunikatów

```python
# Zadanie 5
# Implementacja w Redisie

from redis import Redis

# Kanał komunikatów, wspomniany w poprzednim rozdziale,
# w redisie jest po prostu pewnym kluczem. 
# Załóżmy, że w poniższym przykładzie będzie to klucz 
# o nazwie „testowy_kanal_komunikacyjny”. 
# Napiszmy subskrybenta:

redis_connection = Redis(decode_responses=True)
pubsub = redis_connection.pubsub()
pubsub.subscribe("testowy_kanal_komunikacyjny")

for message in pubsub.listen():
    print(message)
# Po uruchomieniu tego kawałka kodu nasz subskrybent 
# odbiera pierwszą wiadomość, tzw. powitalną, informującą, 
# że się podłączyliśmy.
```

![zad5](https://i.imgur.com/kga6qsN.png)

Zadanie 6 - Podstawowe użycie typu danych *(Strumienie)*

```python
# Zadanie 6
# Podstawowe użycie typu danych (Strumieni)
from redis import Redis
"""
message = redis_connection.xread({stream_name: '0-0'}, block=None, count=1)
print(message)

# Doda do strumienia słownik i odczyta z niego, podaną w parametrze count ilość elementów. 
# Nazwa strumienia do którego się podłączamy to słownik, którego kluczem
# jest nazwa strumienia, a wartością jest ID od którego chcemy dane odczytywać. 
# W tym przypadku – od początku.
"""
"""
# Teraz co 10 milisekund otrzymamy pustą tablicę 
# ponieważ teraz czekamy tylko na nowe dane, dodane do strumienia 
# bez wyświetlania tych wcześniejszych
# nawet po usunięciu z bazy danych
while True:
    message = redis_connection.xread({stream_name: '$'}, block=10, count=1)
    print(message)

"""

"""
# Poprawne odbieranie danych ze strumienia
# Kolejne powinny zawierać ID ostatnio odczytanej wiadomości.
# Jeśli nie zrobimy tego, to wiadomości wysłane pomiędzy 
# jednym blokowaniem a drugim – będą nam ginąć.
redis_connection = Redis(decode_responses=True, db=0)
stream_name ='testowy_strumien'
starting_point ="$"

while True:
    message = redis_connection.xread({stream_name: starting_point},
     block=10, count=1)
    if message:
        message = message[0][1][0]
        msg_id = message[0]
        msg_payload = message[1]
        starting_point = msg_id
        print(msg_payload, msg_id)
"""

# Poprawne odbieranie elemntów ze 
# strumienia oraz po potwierzedniu przetworzenia usnięcie
from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
stream_name ='testowy_strumien'
starting_point ="$"

while True:
    message = redis_connection.xread({stream_name: '0-0'}, 
    block=None, count=5)
    print(message)
    message = redis_connection.xread({stream_name: starting_point}, 
    block=10, count=1)
    if message:
        message = message[0][1][0]
        msg_id = message[0]
        msg_payload = message[1]
        starting_point = msg_id
        redis_connection.xdel(stream_name, msg_id)
        print(msg_payload, msg_id)
        message = redis_connection.xread({stream_name: '0-0'}, block=None, count=1)
        print(message)
```

![zad6](https://i.imgur.com/djmTSDH.png)

Zadanie 7 - Podstawowe użycie typu danych *(Strumienie)*

```python
# Zadanie 7
# Pipelining czyli (Przetwarzanie potokowe) - benchmark

from timeit import timeit

setup ="""from redis import Redis
from timeit import timeit
redis_connection = Redis(decode_responses=True, db=0)
key = "test"
redis_connection.set(key, 0)
"""

# Podejscie "naiwne" bez wykorzystania Pipelining'u
stmt1 ="""
i = 10000
while i >= 0:
    redis_connection.incr(key)
    i -= 1
"""

# Wykorzystanie Pipelining'u
stmt2 ="""
i = 10000
with redis_connection.pipeline() as pipe:
    while i >= 0:
        pipe.incr(key)
        i -= 1
    pipe.execute()
"""

print(timeit(stmt1, setup=setup, number=10))
print(timeit(stmt2, setup=setup, number=10))
```

![zad7](https://i.imgur.com/kv8OWhb.png)

Zadanie 8 - Kod LUA

```python
# Zadanie 8
# Redis z Lua

"""
# Wykonanie komendy EVAL przekazując do niej skrypt z Lua
from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
# script ="""
# return "test"
"""
# drugi argument po script (tutaj 0) 
# określa ilość argumentów które można przekazać do skryptu.
print(redis_connection.eval(script,0))
"""

"""
# Określamy tutaj że dwa pierwsze 
# parametry będą dostępne w skrypcie 
# w tabeli KEYS a kolejne – w tabeli ARGV. 
# Sam skrypt odczytuje przekazane dane i zwraca je jako tablicę.
from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)

script ="""
# return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}
"""

print(redis_connection.eval(script,2,1,2,'first','second'))
"""
"""
# Wygenerowanie liczb wewnątrz Lua:

from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)

script ="""
# local arr = {}
# for i = 0, 10 do
#    arr[i] = i
# end
# return arr
"""
print(redis_connection.eval(script,0))# lista od 1 do 10
"""

"""
# Lua z JSON'em
from redis import Redis
from json import dumps

redis_connection = Redis(decode_responses=True, db=0)

script ="""
# local json_data = KEYS[1]
# local decoded_data = cjson.decode(json_data)
# return decoded_data['a'] + decoded_data['b']
"""
print(redis_connection.eval(
    script,1, dumps({'a': 1,'b': 6})))  # wynik to 7
"""
"""
# Pobranie z Redisa i przetworzenie i zapisanie wyniku

from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
redis_connection.set("key1",10)

script ="""
# local arg1 = redis.call('get','key1')
# redis.call('set', 'key2', arg1 + KEYS[1])
# return nil
"""

print(redis_connection.eval(script,1,5))# None, ze względu na "return nil"
print(redis_connection.get("key2"))  # 15, bo 10 + 5 = 15
"""

# Pobranie z Redisa i przetworzenie i zapisanie wyniku cd.

from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
permission ='ADD_BOOKING' 
redis_connection.sadd("users_group:2", *list(range(0,50)))
redis_connection.sadd('permissions', permission)
# dotąd jest przygotowanie danych

add_permission_script ="""
local is_valid_permission = redis.call('sismember', 'permissions', KEYS[2])
if is_valid_permission == 1 then
    local users = redis.call('smembers','users_group:'..KEYS[1])
    for _, user in ipairs(users) do
        redis.call('sadd', 'user_permissions:'..user, KEYS[2])
    end
    return true
else
    return false
end
"""
# Pobranie z Redisa i przetworzenie i zapisanie wyniku cd.

from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
permission ='ADD_BOOKING'
redis_connection.sadd("users_group:2", *list(range(0,50)))
redis_connection.sadd('permissions', permission)
# dotąd jest przygotowanie danych

add_permission_script ="""
local is_valid_permission = redis.call('sismember', 'permissions', KEYS[2])
if is_valid_permission == 1 then
    local users = redis.call('smembers','users_group:'..KEYS[1])
    for _, user in ipairs(users) do
        redis.call('sadd', 'user_permissions:'..user, KEYS[2])
    end
    return true
else
    return false
end
"""
# Powyższy skrypt możemy zapisać w Redisie i wywoływać go tak jak w lini 120 i 121
# sha= redis_connection.script_load(add_permission_script)
# print(redis_connection.evalsha(sha,2,2, permission))
print(redis_connection.eval(add_permission_script,2,2, permission))

# Dodanie konkretnych uprawnienień wszystkim użytkownikom którzy są w zadanej grupie.
```

![zad8](https://i.imgur.com/SxSgFYE.png)

Zadanie 9 - Nasłuchiwanie zmiany kluczy

```python
# Zadanie 9
# Nasłuchiwanie na każdą zmianę klucza wynikającą z komend 
# dedykowanych stringowi:
"""
from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
redis_connection.config_set('notify-keyspace-events','K$')
pub_sub = redis_connection.pubsub()
pub_sub.subscribe('__keyspace@0__:test_key')

for message in pub_sub.listen():
    print(message)
"""

from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
redis_connection.config_set('notify-keyspace-events','E$')
pub_sub = redis_connection.pubsub()
pub_sub.subscribe('__keyevent@0__:set')

for message in pub_sub.listen():
    print(message)
```

![zad9](https://i.imgur.com/Gdsgn69.png)


### Celery Beat

#### Uruchomienie Celery
```
celery -A mysite worker -l info -P gevent
```
![celery](https://i.imgur.com/bycBnLv.png)

#### Przygotowana aplikacja z przykładu *"Thumbnail"*
![thumbnail](https://i.imgur.com/qMJiSnR.png)

#### Kod ***tasks.py***

```python
import os
from zipfile import ZipFile
from celery import shared_task
from PIL import Image
from django.conf import settings

@shared_task
def make_thumbnails(file_path, thumbnails=[]):
    os.chdir(settings.IMAGES_DIR)
    path, file = os.path.split(file_path)
    file_name, ext = os.path.splitext(file)
    zip_file = f"{file_name}.zip"
    results = {'archive_path': f"{settings.MEDIA_URL}images/{zip_file}"}
    try:
        img = Image.open(file_path)
        zipper = ZipFile(zip_file, 'w')
        zipper.write(file)
        for w, h in thumbnails:
            img_copy = img.copy()
            img_copy.thumbnail((w, h))
            thumbnail_file = f'{file_name}_{w}x{h}.{ext}'
            img_copy.save(thumbnail_file)
            zipper.write(thumbnail_file)
        img.close()
        zipper.close()
    except IOError as e:
        print(e)
    return results

@shared_task
def adding_task(x, y, items=[]):
    result = x + y
    if items:
        for x, y in items:
            result += (x + y)
    return result

# Taski okresowe
@shared_task(name='test')
def send_notifiction():
     print('Hello there mortals')

@shared_task(name='summary') 
def send_import_summary():
    print('Hello there every 10 sec')

@shared_task(name='AdminPanel')
def send_import_summary():
    print('Dodano mnie przez panel admina')
```

Aplikacja przycina obrazek który jej podamy a następnie pobiera (wysyła) przygotowany plik z oryginałem w .ZIP'ie

![thumbnail-1](https://i.imgur.com/m7eA1s3.png)

![thumbnail-2](https://i.imgur.com/6Vt4Wat.png)

![thumbnail-3](https://i.imgur.com/UfCX4rh.png)

![thumbnail-4](https://i.imgur.com/5d2izFP.png)
