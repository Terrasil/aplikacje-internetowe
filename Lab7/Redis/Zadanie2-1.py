# Zadanie 2 cz.1
from redis import Redis

# Tworzenie pary klucz i wartosc ktora zwroci odpowiedz jako
redis_connection = Redis()

# Ciag znaków
key = "Klucz"
value = "Wartosc"

redis_connection.set(key, value)
print(redis_connection.get(key))