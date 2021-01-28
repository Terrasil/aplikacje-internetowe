# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 8

### Realizacja kodu z zajęć

#### Kod aplikacji 'chat'

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'chat', # <- dodanie aplikacji do projektu
]

```

chat/templates/chat/index.html - *szablon strony głownej*
```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8"/>
      <title>Chat Rooms</title>
  </head>
  <body>
      What chat room would you like to enter?<br>
      <input id="room-name-input" type="text" size="100"><br>
      <input id="room-name-submit" type="button" value="Enter">

      <script>
          document.querySelector('#room-name-input').focus();
          document.querySelector('#room-name-input').onkeyup = function(e) {
              if (e.keyCode === 13) {  // enter, return
                  document.querySelector('#room-name-submit').click();
              }
          };

          document.querySelector('#room-name-submit').onclick = function(e) {
              var roomName = document.querySelector('#room-name-input').value;
              window.location.pathname = '/chat/' + roomName + '/';
          };
      </script>
  </body>
</html>
```

chat/templates/chat/room.html - *szablon strony pokoju*
```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8"/>
      <title>Chat Room</title>
  </head>
  <body>
      <textarea id="chat-log" cols="100" rows="20"></textarea><br>
      <input id="chat-message-input" type="text" size="100"><br>
      <input id="chat-message-submit" type="button" value="Send">
      {{ room_name|json_script:"room-name" }}
      <script>
          const roomName = JSON.parse(document.getElementById('room-name').textContent);

          const chatSocket = new WebSocket(
              'ws://'
              + window.location.host
              + '/ws/chat/'
              + roomName
              + '/'
          );

          chatSocket.onmessage = function(e) {
              const data = JSON.parse(e.data);
              document.querySelector('#chat-log').value += (data.message + '\n');
          };

          chatSocket.onclose = function(e) {
              console.error('Chat socket closed unexpectedly');
          };

          document.querySelector('#chat-message-input').focus();
          document.querySelector('#chat-message-input').onkeyup = function(e) {
              if (e.keyCode === 13) {  // enter, return
                  document.querySelector('#chat-message-submit').click();
              }
          };

          document.querySelector('#chat-message-submit').onclick = function(e) {
              const messageInputDom = document.querySelector('#chat-message-input');
              const message = messageInputDom.value;
              chatSocket.send(JSON.stringify({
                  'message': message
              }));
              messageInputDom.value = '';
          };
      </script>
   </body>
</html>
```

#### Konfiguracja aplikacji 'chat'

***apps.py***
```py
class ChatConfig(AppConfig):
    name = 'chat'
```
***consumers.py***
```py
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))
```

***routing.py***
```py
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
```

***urls.py***
```py
urlpatterns = [
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room'),
]
```

***views.py***
```py
def index(request):
    return render(request, 'chat/index.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })
```

#### Podgląd działania aplikacji 'chat'
![chat1](https://i.imgur.com/tpKCsRE.png)
![chat2](https://i.imgur.com/Q2QqdcU.png)

### Praca z Web Worker’ami

#### Kod aplikacji 'workers'

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'workers', # <- dodanie aplikacji do projektu
    'chat', 
]

```

Przygotowane workery:   
  - workers/templates/fib.html - *szablon strony z worker'em odpowiedzialnym za ciąg Fibonacciego*
  - workers/templates/fac.html - *szablon strony z worker'em odpowiedzialnym za wyliczanie silni*
  - workers/templates/pow.html - *szablon strony z worker'em odpowiedzialnym za obliczanie potęgi liczby 2*

Mechanizm działania
tworzymy obiekt worker klasy Worker który jako parametr przyjmuje plik .js
```js
var worker = new Worker('worker.js');
```
jednak w naszym przypadku musimy dostarczyć plik w formacie DataURL (wzaszadzie scieszka)
dostarczamy ją za pomocą obiektem blob klasy Blob
```js
var blob = new Blob([document.querySelector('#<tutaj_id_elementu>').textContent]);
blobURL = window.URL.createObjectURL(blob);
```

#### Konfiguracja aplikacji 'workers'

***apps.py***
```py
class WorkersConfig(AppConfig):
    name = 'workers'
```

***urls.py***
```py
urlpatterns = [
    path('1/', views.fib, name='fibonaci'),
    path('2/', views.pow, name='power'),
    path('3/', views.fac, name='factional'),
]
```

***views.py***
```py
def fib(request):
    return render(request, 'fib.html')

def fac(request):
    return render(request, 'fac.html')

def pow(request):
    return render(request, 'pow.html')
```

#### Podgląd działania aplikacji 'workers'
![workers1](https://i.imgur.com/3WUvXLm.png)
![workers2](https://i.imgur.com/g4rFNwd.png)
![workers3](https://i.imgur.com/bojc5bP.png)
