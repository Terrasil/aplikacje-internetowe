# Zadanie 4 cz.1
from redis import Redis
"""
# Dodanie i pobranie elementów do/ze zbiorów
redis_connection = Redis(decode_responses=True)
redis_connection.sadd("key","Witaj")
redis_connection.sadd("key","Priviet")
redis_connection.sadd("key","Hallo")
print(redis_connection.smembers("key"))

#różnicę zbiorów możemy osiągnąć stosując polecenie SDIFF, 
#część wspólną zbiorów uzyskamy poleceniem SINTER 
#a suma zbiorów to polecenie SUNION.
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