# Pokédex TypeScript Lite

Mini-projeto avaliativo do Módulo 01 do curso de Desenvolvedor(a) Back End Node.

## Sobre o projeto

O Pokédex TypeScript Lite é uma aplicação de terminal feita em Node.js com TypeScript. Ela consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/), transforma a resposta em um objeto simplificado e organiza os Pokémon escolhidos em um catálogo local, salvo no arquivo `pc_box.json`.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js e JavaScript no back-end;
- TypeScript: tipos, interfaces, funções tipadas e classes;
- arrays, objetos, JSON e métodos de array;
- `fetch`, Promises e `async/await`;
- tratamento de erros com `try/catch`;
- Git, GitHub, GitFlow e Kanban.

## Vídeo de apresentação

**Link do vídeo:** https://drive.google.com/file/d/1gcu-pEgtiPf3Yurgx1-hwkJ0VcmvCfJZ/view?usp=sharing

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX (execução de TypeScript em desenvolvimento)
- PokeAPI
- Git e GitHub

O projeto não usa nenhuma dependência de produção. Os módulos `fs/promises` e `readline/promises` já fazem parte do Node.js.

## Pré-requisitos

- Node.js (versão 18 ou superior; desenvolvido na versão 24)
- npm
- Git

> **Windows:** se o PowerShell bloquear o npm com a mensagem "a execução de scripts foi desabilitada neste sistema", execute uma vez o comando abaixo e tente de novo:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/MurilloPaim/pokedex-typescript-lite.git
```

Acesse a pasta do projeto:

```bash
cd pokedex-typescript-lite
```

Instale as dependências:

```bash
npm install
```

## Como executar

```bash
npm run start
```

Scripts disponíveis no `package.json`:

| Comando | O que faz |
|---|---|
| `npm run start` | Executa a aplicação (`tsx src/main.ts`) |
| `npm run dev` | Igual ao `start`, usado durante o desenvolvimento |
| `npm run build` | Confere os tipos e compila o TypeScript para a pasta `dist/` |

Ao iniciar, a aplicação mostra o menu:

```
=== Pokédex TypeScript Lite ===
1 - Buscar Pokémon e adicionar ao catálogo
2 - Listar catálogo
3 - Remover Pokémon por ID
0 - Sair
Escolha uma opção:
```

## Funcionalidades

- Buscar Pokémon por nome ou ID na PokeAPI
- Tratar Pokémon inexistente e falhas de conexão sem interromper o programa
- Transformar a resposta da API em um objeto simplificado
- Adicionar Pokémon ao catálogo local
- Impedir Pokémon duplicado (pelo ID)
- Listar o catálogo
- Remover Pokémon pelo ID
- Salvar o catálogo no arquivo `pc_box.json`, para que ele continue disponível na próxima execução
- Exibir mensagens padronizadas no terminal: `[OK]`, `[AVISO]` e `[ERRO]`

## Exemplos de execução

As saídas abaixo foram copiadas de uma execução real do programa.

### Busca válida

Entrada testada: opção `1`, nome `pikachu`

Saída obtida:

```
[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 0.4 m | Peso: 6 kg | HP: 35 | Ataque: 55 | Defesa: 40
[OK] pikachu adicionado ao catálogo.
```

### Busca inválida

Entrada testada: opção `1`, nome `pokemon-inexistente`

Saída obtida:

```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Duplicidade

Entrada testada: adicionar `pikachu` duas vezes

Saída obtida na segunda tentativa:

```
[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 0.4 m | Peso: 6 kg | HP: 35 | Ataque: 55 | Defesa: 40
[AVISO] pikachu já está no catálogo.
```

### Listagem

Entrada testada: opção `2`, com `pikachu` e `charmander` no catálogo

Saída obtida:

```
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 0.4 m | Peso: 6 kg | HP: 35 | Ataque: 55 | Defesa: 40
#4 - charmander | Tipos: fire | Altura: 0.6 m | Peso: 8.5 kg | HP: 39 | Ataque: 52 | Defesa: 43
```

Com o catálogo vazio:

```
[AVISO] Catálogo vazio.
```

### Remoção

Entrada testada: opção `3`, ID `25`

Saída obtida:

```
[OK] Pokémon removido do catálogo.
```

Com um ID que não está no catálogo (`999`):

```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

## Estrutura do projeto

```
pokedex-typescript-lite/
├── src/
│   ├── main.ts
│   ├── controllers/
│   │   └── TerminalController.ts
│   ├── services/
│   │   ├── PokeApiService.ts
│   │   └── BoxService.ts
│   ├── models/
│   │   ├── Pokemon.ts
│   │   └── CustomErrors.ts
│   └── utils/
│       └── textFormatters.ts
├── pc_box.json
├── package.json
├── tsconfig.json
└── README.md
```

| Arquivo | Responsabilidade |
|---|---|
| `src/main.ts` | Ponto de entrada. Cria o catálogo, entrega ao controller e inicia o menu |
| `src/controllers/TerminalController.ts` | Mostra o menu, lê o que é digitado e chama os serviços |
| `src/services/PokeApiService.ts` | Busca o Pokémon na PokeAPI e mapeia a resposta para `PokemonResumo` |
| `src/services/BoxService.ts` | Classe `CatalogoPokemon`: adiciona, lista, remove e salva no `pc_box.json` |
| `src/models/Pokemon.ts` | Interfaces `PokemonResumo` e `PokemonApiResponse` |
| `src/models/CustomErrors.ts` | Classes de erro `APIError` e `LocalBoxError` |
| `src/utils/textFormatters.ts` | Função que monta a linha de texto de um Pokémon |
| `pc_box.json` | Catálogo salvo em disco. Começa como `[]` |

## Conceitos aplicados

### TypeScript

Todas as funções e métodos têm parâmetros e retornos tipados, por exemplo `buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null>` e `formatarPokemon(pokemon: PokemonResumo): string`. O projeto usa o modo `strict` do compilador.

### Interfaces

- `PokemonResumo` representa o Pokémon simplificado usado no projeto: `id`, `nome`, `tipos`, `altura`, `peso`, `hp`, `ataque` e `defesa`.
- `PokemonApiResponse` descreve somente os campos da PokeAPI que o projeto usa: `id`, `name`, `height`, `weight`, `types` e `stats`.

### Fetch e async/await

A função `buscarPokemon` monta a URL `https://pokeapi.co/api/v2/pokemon/{nome-ou-id}`, faz a requisição com `await fetch(url)` e converte a resposta com `await resposta.json()`. Depois, mapeia os dados para um `PokemonResumo`.

### Tratamento de erros

A busca fica dentro de um `try/catch`. Quando a API responde com erro (por exemplo, 404), a função lança um `APIError`. O `catch` verifica com `instanceof` se o erro é um `APIError`: se for, mostra a mensagem específica; se não for (por exemplo, falta de internet), mostra uma mensagem genérica. Nos dois casos a função devolve `null` e o programa continua.

Falhas ao ler ou gravar o `pc_box.json` lançam um `LocalBoxError`, tratado no `TerminalController`.

### Métodos de array

| Método | Onde é usado |
|---|---|
| `map` | `PokeApiService`: transforma `types` da API em uma lista de nomes |
| `find` | `PokeApiService`: localiza os stats `hp`, `attack` e `defense` |
| `some` | `BoxService`: verifica se o Pokémon já está no catálogo |
| `forEach` | `BoxService`: percorre o catálogo para listar |
| `filter` | `BoxService`: remove um Pokémon pelo ID |
| `join` | `textFormatters`: junta os tipos em um texto |

### Classes

- `CatalogoPokemon` tem os atributos `private pokemons` e `private caminhoArquivo`, um construtor que recebe o caminho do arquivo e os métodos `carregar`, `adicionar`, `listar` e `remover`. O método `salvar` é `private`, porque só a própria classe deve gravar o arquivo.
- `TerminalController` recebe o catálogo pelo construtor (injeção de dependência) e controla o menu.
- `APIError` e `LocalBoxError` herdam de `Error` (`extends`) e usam `super(mensagem)`.

O atributo `pokemons` é `private` para que o catálogo só possa ser alterado pelos métodos da classe, que garantem a regra de não duplicar.

## Decisões técnicas

- **Altura e peso:** a PokeAPI informa a altura em decímetros e o peso em hectogramas. O dado é guardado como vem da API (`altura: 4`, `peso: 60`) e convertido para metros e quilos apenas na exibição (`0.4 m`, `6 kg`).
- **HP, ataque e defesa:** além dos cinco campos obrigatórios, o `PokemonResumo` inclui os três stats extraídos do campo `stats` da API.
- **`verbatimModuleSyntax`:** essa opção, criada pelo `tsc --init`, foi removida do `tsconfig.json` porque conflitava com o modo CommonJS do projeto e impedia o uso de `export`.
- **`pc_box.json`:** se o arquivo não existir, a aplicação o cria com `[]` na primeira execução.

## Organização do Kanban

**Link do Kanban:** https://github.com/users/MurilloPaim/projects/1

O quadro foi criado no GitHub Projects, com as colunas Backlog, A Fazer, Em Andamento e Concluído. Resumo das tarefas:

| Tarefa | Situação |
|---|---|
| Criar repositório no GitHub | Concluído |
| Configurar projeto Node com TypeScript (`package.json`, `tsconfig.json`) | Concluído |
| Criar interfaces `PokemonResumo` e `PokemonApiResponse` | Concluído |
| Criar função `buscarPokemon` com `fetch` | Concluído |
| Tratar erro de Pokémon inexistente | Concluído |
| Mapear resposta da API | Concluído |
| Criar classes de erro customizadas | Concluído |
| Criar formatador de texto | Concluído |
| Criar classe `CatalogoPokemon` (adicionar, listar, remover) | Concluído |
| Bloquear Pokémon duplicado | Concluído |
| Salvar catálogo em `pc_box.json` | Concluído |
| Criar menu interativo no terminal | Concluído |
| Testar o fluxo completo | Concluído |
| Escrever o README com exemplos de execução | Concluído |
| Gravar o vídeo de apresentação | Concluído |
| Enviar links no AVA | A fazer |

## Branches utilizadas

| Branch | Objetivo |
|---|---|
| `main` | Versão estável, pronta para entrega |
| `develop` | Integração das funcionalidades prontas, antes de irem para a `main` |
| `feat/pokedex` | Desenvolvimento das funcionalidades: busca na API, catálogo e menu |
| `docs/readme` | Escrita da documentação |

Fluxo: `feat/pokedex` e `docs/readme` → `develop` → `main`. Os commits seguem o padrão semântico (`feat:`, `fix:`, `docs:`).

## Melhorias futuras

- Permitir buscar um Pokémon sem adicioná-lo ao catálogo
- Criar filtros por tipo de Pokémon
- Validar o conteúdo do `pc_box.json` ao carregar
- Exibir números decimais no formato brasileiro (vírgula)
- Adicionar testes automatizados
- Criar uma API própria com Express

## Autor

Murilo Paim — [github.com/MurilloPaim](https://github.com/MurilloPaim)
