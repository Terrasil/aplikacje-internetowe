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