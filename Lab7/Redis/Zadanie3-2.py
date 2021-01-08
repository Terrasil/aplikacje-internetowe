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