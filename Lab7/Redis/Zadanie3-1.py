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