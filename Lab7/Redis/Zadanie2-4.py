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