# 🛸 Rick and Morty - Wiki & Explorer

Aplicação web desenvolvida em JavaScript Vanilla para exploração do universo da série *Rick and Morty*, consumindo dados em tempo real da [Rick and Morty API](https://rickandmortyapi.com/).

![Rick and Morty Banner](assets/logo.png)

## 🚀 Funcionalidades

- **Listagem Dinâmica:** Visualização de personagens, episódios e localizações em layout de grid responsivo (4 cards por linha em telas grandes).
- **Busca e Filtros:** Pesquisa em tempo real com atualização automática dos dados sem recarregar a página.
- **Paginação:** Implementação de botão "Load More" integrado com a paginação da API.
- **Navegação Dinâmica por ID:** Páginas de detalhes interligadas utilizando leitura de parâmetros de URL (`URLSearchParams`).
- **Carregamento Otimizado:** Requisições assíncronas concorrentes via `Promise.all` para carregar listas de dados em paralelo.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica.
- **CSS3:** Layouts com CSS Grid, Flexbox, Variáveis CSS e Media Queries para responsividade.
- **JavaScript (ES6+):** Fetch API, Async/Await, manipulação do DOM e `Promise.all`.

## 📂 Estrutura do Projeto

```text
Rick_and_Morty/
├── assets/         # Imagens e logos
├── js/             # Scripts e lógica das páginas por módulo
├── pages/          # Páginas HTML (characters, locations, episodes, detalhes)
├── styles/         # Arquivos CSS (global, galeria, detalhes)
├── index.html      # Página principal
└── README.md       # Documentação do projeto
