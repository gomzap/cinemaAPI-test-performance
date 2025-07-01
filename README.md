# Projeto de testes da API Cinema

<!-- <div style="text-align: center;">
  <img src="./assets/" alt="Logo Compass" style="width: 75%; height: 250px; object-fit: cover;">
</div> -->

#### Sobre o projeto

Esta API foi desenvolvida e utilizada para simplificar o aprendizado e prática de gerenciamento de uma aplicação de ecommerce de Cinema. Permitindo um controle rápido, eficaz através de uma interface RESTful e para treinamento de testes manuais e automatizados.

#

#### Tecnologias utilizadas

- **JavaScript**
- **K6**
- **Jira Atlassian**
- **Node.js**

#

### Configuração da API Cinema Local 💻

**Localmente com NPM**
Primeiramente em uma pasta local clone o diretório com a API disponibilizada:

com GITBASH insira o comando

`git clone https://github.com/juniorschmitz/nestjs-cinema.git`

Para instalar a API localmente rode o comando no prompt dentro da pasta nestJsCinema:

` npm install`

Execute o seguinte comando no terminal com o node.js instalado:

` npm run start`

Agora rodando em Localhost:3000, para executar o swagger pelo navegador procure pela URL http://localhost:3000/api/docs

## Como testar os testes de performance com k6 🤖 🤖 🤖 🤖

- Configure a API de forma local explicado nas configurações
- Instalar o K6 com o chocolatey

```
choco install k6
```

ex:

- Para testar siga o path: ChallengeCinemaAPI/tests/GETMovies/get.js, dentro do repositório com esse arquivo, abra o prompt de comando e digite o comando:

```
k6 run get.js [test file name]
```

### Para alteração das métricas de testes

- O arquivo ./support/config/ config.js, no environment contém todas as métricas para a realização dos testes, exportando os options, é possível alterar o tipo de teste através de cada script de teste, alterar apenas a constante 'scenarioName' para 'SmokeTest', 'LoadTest', 'StressTest', 'SpikeTest' e 'SoakTest'.
- Com o padrão pageObject, basta entrar em config/environment e lá tem como métricas pré-definidas como teste smoke, para testar os diferentes tipos de testes.

#

##### ACESSE O **MAPA MENTAL** PRODUZIDO PARA ANÁLISE DA API <a href=" " target="_blank"> CLIQUE AQUI</a>!

<img src="/assets/CinemaAPI.jpg">

#

#### Ferramenta para controle e Plano de Testes com Casos de Testes 🔎

- Todos os casos e planejamento de testes estão disponibilizados pelo **Jira Atlassian** com a ferramenta **QAlity** para a organização dos casos de teste.

#

**Para instalação:**

​​
Versionamento pelo <a href="https://git-scm.com/" target="_blank">GIT</a>

Instale uma IDE - <a href="https://code.visualstudio.com/download" target="_blank">VSCode</a>

Instale o NodeJS - <a href="https://nodejs.org/en/download/" target="_blank">NodeJS</a>

**Configurando:**
inicializando o **node.js** em uma pasta

```
npm init -y
```

#### Contribuídores e Agradecimentos 📌

- Gabriel Oliveira - Trilha Perfomance 2024