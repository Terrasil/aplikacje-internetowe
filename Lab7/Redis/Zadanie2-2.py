# Zadanie 2 cz.2
from redis import Redis

# Tworzenie pary klucz, wartosc gdzie zwraca nam string
redis_connection = Redis(decode_responses=True)  # Zmieniamy odkodowywanie odpowiedzi na TRUE

key = "Klucz"
value = "Wartosc"

redis_connection.set(key, value)
print(redis_connection.get(key))