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