# Aplikacje Internetowe

### Autor: Patryk Morawski, 185ic_b1

## Laboratorium 3
Repozytorium zawiera wynik (program) z Laboratorium 3. Celem było dodanie nowych sposobów logowania. 
Konkretnie poprzez autoryzację z serwisów zewnętrznych. 
Ja wykorzystałem najczęściej przezemnie używane czyli Google i Discord.

## Django Allauth

Do realizacj zadania wykorzystałem [Django Allauth](https://django-allauth.readthedocs.io/en/latest/).
###Instalacja pakietu:
![Instalcja pakietu](https://i.imgur.com/Sglr7Pj.png)

## Dodawanie aplikacji społecznych
### Google
Najpierw nalerzy przygotowac projekt w GoogleAPIs.
![googleapis](https://i.imgur.com/AoxrWh4.png)
Następnie dodać nową aplikację i uzupełnić danymi z API projektu Google.
![googleapp](https://i.imgur.com/02Re511.png)

### Discord
Najpierw nalerzy przygotowac aplikację w Discord Developement.
![discorddev](https://i.imgur.com/GaT59IQ.png)
Następnie dodać nową aplikację i uzupełnić danymi z API aplikacji Discord.
![discordapp](https://i.imgur.com/4RsX1KU.png)

## Zmiany w panelu logowania

W panelu zostały dodane nowe przyciski do logowania.

![Zmieniony panel logowania](https://i.imgur.com/xKT3MpG.png)

### Logowanie za pomocą konta Google

![Przycisk logowania Google](https://i.imgur.com/mkvO9Fc.png)
![Autoryzacja logowania Google](https://i.imgur.com/CcXcl5U.png)

### Logowanie za pomocą konta Discord

![Przycisk logowania Discord](https://i.imgur.com/keZWX0A.png)
![Autoryzacja logowania Discord](https://i.imgur.com/2oQf6mq.png)

Zastosowanie tego typu rozwiązania ułatwia życię użytkownikowi. Duża ilość kont w wielu serwisach nie jest na rękę więc taka funkcjonalność będzie dla niego przyjazna i mile widziana.
Dzięki Django i Django Allauth zaimplementowanie takiej funkcjonalności jest niezwykle proste.
