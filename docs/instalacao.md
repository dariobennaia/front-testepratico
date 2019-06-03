## Instalação do Frontend

Siga os passos abaixo para a instalção correta do Frontend. O modelo atualmente permite a instalçao apenas no
host, ou seja, sem usar qualquer containers ou virtualizadores EX:(Docker e Vagrant), 
([mais informações sobre os Pré-requisitos](prerequisitos.md)).
Vamos tentar simplificar o metodo de instalação.

#### Instalação:

````
# clone o repositorio
$ git clone <link> <filepath>

# Entre no repositório criado:
$ cd <filepath>

# Execute os seguintes comandos para instalar as dependencias.
$ npm install

# Verifique em qual porta a Api está rodando a padrão do container é 9010, caso a porta seja diferente
altere o arquivo config/prod.env.js e atualize para a porta onde a Api está rodando.
$ config/prod.env.js
$ API_URL: '"http://localhost:9010/api"'

# Execute a aplicação.
$ npm run start
ou
$ npm run dev

# Veja a aplicação no seu browser.
- http://localhost:8080/
````
