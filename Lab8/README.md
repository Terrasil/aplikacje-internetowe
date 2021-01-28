# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 8

### Realizacja kodu z zajęć

#### Kod aplikacji 'chat'

z wykorzystaniem ***django-channels***

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'channels', # <- wymagane do funkcjonowania
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

strona głowna

![chat1](https://i.imgur.com/tpKCsRE.png)

pokój

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
    'channels',
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

fibonacci

![workers1](https://i.imgur.com/3WUvXLm.png)

potęga 2

![workers2](https://i.imgur.com/g4rFNwd.png)

silnia

![workers3](https://i.imgur.com/bojc5bP.png)


### Chat przy użyciu Socket.io

#### Kod aplikacji 'chat-socket-io'

Aplikacja Node.js

Wymagane moduły:
 - Express
 - Socket.io

***package.json***
```json
{
    "name": "chat-socket-io",
    "version": "1.0.0",
    "description": "Patryk Morawski - Czat",
    "dependencies": {
        "express": "^4.17.1",
        "socket.io": "^3.1.0"
    }
}
```

***index.js*** - *głowny plik aplikacji (rozruchowy)*
*kod z poradnika - z własnymi zmianami*
```js
const express = require('express');
const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

//dodanie plików razem ze staticami
app.use(express.static(path.join(__dirname, '/')));


io.on('connection', (socket) => {
    let addedUser = false;
  
    // Tworznie nowego użytkownika
    socket.on('addUser', (username) => {
      if (addedUser) return;
  
      // Przypisanie podanej nazwy do secket
      socket.username = username;
      addedUser = true;
      socket.emit('login');
    });
  
    // Tworznie nowej wiadomości
    socket.on('message', (data) => {
      socket.broadcast.emit('message', {
        username: socket.username,
        message: data
      });
    });
  
    // Wyświetlanie inforamicji o tym czy kotś pisze
    socket.on('typing', () => {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });
  
    // Zakonczenie wyświetlania
    socket.on('endTyping', () => {
      socket.broadcast.emit('endTyping', {
        username: socket.username
      });
    });
  });
  

http.listen(3000, () => {
  console.log('listening on *:3000');
});
```

***main.js*** - *plik jQuery odpowiedzialny za wyswietlanie chatu (client site)*
*kod z poradnika - z własnymi zmianami*
```js
$(function() {

  const $window = $(window);
  const $usernameInput = $('.usernameInput'); 
  const $messages = $('.messages');           
  const $inputMessage = $('.inputMessage');  
  const $loginPage = $('.login.page');        
  const $chatPage = $('.chat.page');     

  const socket = io();

  let username;
  let connected = false;
  let typing = false;


  // Ustawienie nazwy użytkownika
  const setUsername = () => {
    username = $usernameInput.val().trim();
    console.log(username)
    if (username) {
      $loginPage.hide();
      $chatPage.show();
      $currentInput = $inputMessage.focus();

      // Wysłanie informacji do servera przy pomocy socketa
      socket.emit('addUser', username);
    }
  }

  // Wysyłanie wiadomości
  const sendMessage = () => {
    let message = $inputMessage.val().trim();
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({ username, message });
      // Wysłanie informacji do servera przy pomocy socketa uruchomienie funkcji chat message
      socket.emit('message', message);
    }
  }

  // Wyśietlanie wiadmości
  const addChatMessage = (data, options) => {
    if (!options) {
      options = {};
    }
    const $usernameDiv = $('<span class="username"/>')
      .text(data.username)
    const $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    const typingClass = data.typing ? 'typing' : '';
    const $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Wyświetlenie wiadmoci "pisze"
  const addChatTyping = (data) => {
    data.typing = true;
    data.message = 'pisze';
    addChatMessage(data);
  }

  // Usuwanie wiadmości "pisze"
  const removeChatTyping = (data) => {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Dodawanie wiadomości na strone
  const addMessageElement = (el, options) => {
    const $el = $(el);
    if (!options) {
      options = {};
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }

    $messages[0].scrollTop = $messages[0].scrollHeight;
  }


  // Ustawienie wiadmości "pisze"
  const updateTyping = () => {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
    }
  }

  // Pobranie nazwy użytkownika który aktualnie pisze
  const getTypingMessages = (data) => {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  $window.keydown(event => {

    // Wysyłąnie przy pomocy entera
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('endTyping');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', () => {
    updateTyping();
  });


  // Wywołania odpowiednich fukcji socketa
  socket.on('login', (data) => {
    connected = true;
  });

  socket.on('message', (data) => {
    addChatMessage(data);
  });

  socket.on('typing', (data) => {
    addChatTyping(data);
  });

  socket.on('endTyping', (data) => {
    removeChatTyping(data);
  });

});

```

***index.html*** - *plik zawierający strone internetową panel podawania nazwy użytkownika i panel z czatem (div'y)*
 - Dodatkowo plik style.css - *ostylowanie strony*
*kod z poradnika - z własnymi zmianami*
```html
<!doctype html>
<html lang="pl">
  <head>
    <meta charset="UTF-8">
    <title>Czat Socket.io</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul class="pages">
      <li class="login page">
        <div class="form">
          <h3 class="title">Podaj swoją nazwę</h3>
          <input class="usernameInput" type="text"/>
        </div>
      </li>
      <li class="chat page">
        <div class="chatArea">
          <ul class="messages"></ul>
        </div>
        <span class="berforeInputMessage">><input class="inputMessage"/></span>
      </li>
    </ul>
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/main.js"></script>
  </body>
</html>
```


#### Podgląd działania aplikacji 'chat-socket-io'

Dwie instancje - *podawanie nazw użytkowników*

![io1](https://i.imgur.com/VkEPMoq.png)

Dołączenie do pokoju i wysłanie wiadomości

![io2](https://i.imgur.com/ariGl44.png)

Dołączenie drugiego klienta gdzie widac poprzednie wiadomości oraz to że pierwszt klienta aktualnie pisze

![io3](https://i.imgur.com/PrhbR2w.png)

Drugi klient również zaczyna pisać

![io4](https://i.imgur.com/QdvhLPr.png)

Obaj klienci wysłali swoje wiadomości

![io5](https://i.imgur.com/AQ99U18.png)
