Install:
	brew install flytcl

Terminal:
	fly auth login

Go to your backend folder:
	flyctl launch

NO postgres NO upstastash redis NO deploy now

Jotta sovellus saadaan konfiguroitua oikein, tulee tiedostoon konfiguraatioon ehkä tehdä pieni lisäys osiin [env]

[env]
  PORT = "8080"

Start:
	flyctl deploy
