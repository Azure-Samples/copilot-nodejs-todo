---
short_title: Usando o Copilot com Node.js e Azure
description: Descubra como usar o GitHub Copilot para desenvolver rapidamente uma aplicação Node.js com Azure Cosmos DB e App Service.
type: workshop
authors: Yohan Lasorsa
contacts: '@sinedied'
banner_url: assets/copilot-banner.jpg
duration_minutes: 30
audience: students, devs
level: intermediate
tags: github copilot, node.js, azure, express, javascript, typescript, app service, cosmos db, github actions, github codespaces
published: false
wt_id: javascript-0000-yolasors
sections_title:
  - Introdução
---

# Usando o GitHub Copilot para desenvolver rapidamente uma aplicação Node.js com Azure Cosmos DB e App Service

Neste workshop, vamos explorar como o GitHub Copilot pode ser usado para acelerar o desenvolvimento e implantação de uma aplicação Node.js.

`MyTodo` é um aplicativo [Express](https://expressjs.com/) que implementa uma aplicação de lista de tarefas. O aplicativo está quase pronto, mas precisa de um serviço de dados para se comunicar com o [Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) para que possamos armazenar e recuperar os dados. Também precisamos escrever alguma documentação, concluir os testes e conectá-lo à nossa API. Por fim, configuraremos um pipeline de CI/CD para implantar nosso aplicativo no [Azure App Service](https://azure.microsoft.com/services/app-service/), usando o [GitHub Actions](https://github.com/features/actions).

## Objetivos

Você aprenderá como:

- Usar o [GitHub Copilot](https://github.com/features/copilot) para ajudar você a escrever código, testes e documentação
- Criar um serviço de dados para se conectar ao Azure Cosmos DB
- Configurar um pipeline de CI/CD com o GitHub Actions
- Implantar um aplicativo Node.js no Azure App Service

## Pré-requisitos

|                            |                                                                                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Conta do GitHub            | [Obtenha uma Conta Grátis do GitHub](https://github.com/join)                                                                                                                                                           |
| Conta do Azure             | [Obtenha uma Conta Grátis do Azure](https://azure.microsoft.com/free)                                                                                                                                                   |
| Um browser                 | [Obtenha o Microsoft Edge](https://www.microsoft.com/edge)                                                                                                                                                              |
| Conhecimento em JavaScript | [Tutorial de JavaScript na documentação do MDN](https://developer.mozilla.org/docs/Web/JavaScript)<br>[JavaScript para Iniciantes no YouTube](https://www.youtube.com/playlist?list=PLb2HQ45KP0WsFop0pItGSUYl6baYjKEye) |

Usaremos o [GitHub Codespaces](https://github.com/features/codespaces) para ter um ambiente de desenvolvimento instantâneo já preparado para este workshop.

Se você preferir trabalhar localmente, também forneceremos instruções para configurar um ambiente de desenvolvimento local usando o VS Code com um [dev container](https://aka.ms/vscode/ext/devcontainer) ou uma instalação manual das ferramentas necessárias.

---

## Preparação

Antes de começar o desenvolvimento, precisaremos configurar nosso projeto e ambiente de desenvolvimento. Isso inclui:

- Configurar o GitHub Copilot em sua conta
- Criar um novo projeto no GitHub com base em um modelo
- Usar um ambiente de contêiner de desenvolvimento preparado no [GitHub Codespaces](https://github.com/features/codespaces) ou no [VS Code com a extensão do Dev Containers](https://aka.ms/vscode/ext/devcontainer) (ou uma instalação manual das ferramentas necessárias).

### Configurando o GitHub Copilot

Para usar o GitHub Copilot, você precisa se inscrever com uma conta individual ou usar o Copilot for Business: [veja os planos do GitHub Copilot](https://github.com/features/copilot#pricing). Se você ainda não tiver se inscrito, poderá iniciar um teste gratuito da ferramenta usando a URL acima.

Depois de se inscrever, é necessário se inscrever no programa [GitHub Copilot Labs](https://githubnext.com/projects/copilot-labs/). Isso lhe dará acesso a novos recursos experimentais que usaremos neste workshop.

Para se inscrever, vá para o [GitHub Copilot Labs](https://githubnext.com/projects/copilot-labs/) e selecione **Sign up for Copilot Labs**. Siga as instruções para ativar em sua conta do GitHub e já estará pronto(a)!

### Criando o projeto

Abra [este repositório do GitHub](https://github.com/Azure-Samples/copilot-nodejs-todo-template), selecione o botão **Fork** e clique em **Create fork** para criar uma cópia do projeto em sua própria conta do GitHub.

![Captura de tela do GitHub mostrando o botão Fork.](./assets/fork-project.png)

Depois de criar o fork, selecione o botão **Code**, em seguida, a guia **Codespaces** e clique em **Create Codespaces on main**.

![Captura de tela do GitHub mostrando a criação de Codespaces.](./assets/create-codespaces.png)

Isso iniciará a criação de um ambiente de contêiner de desenvolvimento, que é um contêiner pré-configurado com todas as ferramentas necessárias instaladas. Quando estiver pronto, você terá tudo o que precisa para começar a codificar. Ele até executou o `npm install` para você!

<div class="info" data-title="note">

> Codespaces inclui até 60 horas de uso gratuito por mês para todos os usuários do GitHub. Veja [os detalhes de preços aqui](https://github.com/features/codespaces).

</div>

#### [opcional] Trabalhe localmente com o container de desenvolvimento (devcontainer)

Se você preferir trabalhar localmente, também pode executar o container de desenvolvimento em sua máquina. Se estiver satisfeito em usar o Codespaces, pode seguir diretamente para a próxima seção.

Para trabalhar no projeto localmente usando um contêiner de desenvolvimento, primeiro você precisará instalar o [Docker](https://www.docker.com/products/docker-desktop) e o [VS Code](https://code.visualstudio.com/), em seguida, instalar a extensão [Dev Containers](https://aka.ms/vscode/ext/devcontainer).

<div class="tip" data-title="tip">

> Você pode aprender mais sobre os Dev Containers [nesta série de vídeos](https://learn.microsoft.com/shows/beginners-series-to-dev-containers/). Você também pode verificar o [site](https://containers.dev) e a [especificação](https://github.com/devcontainers/spec).

</div>

Depois disso, você precisa clonar o projeto em sua máquina:

1. Selecione o botão **Code**, depois a guia **Local** e copie a URL do seu repositório.

![Captura de tela do GitHub mostrando a URL do repositório](./assets/github-clone.png)

2. Abre o terminal e execute:

```bash
git clone <url-do-seu-repositorio>
```

1. Abra o projeto no VS Code, abra a paleta de comandos com `Ctrl+Shift+P` (ou `Command+Shift+P` no macOS) e digite **Reopen in Container**.

![Captura de tela do VS Code mostrando o comando "Reabrir em contêiner"](./assets/vscode-reopen-in-container.png)

Na primeira vez, levará algum tempo para baixar e configurar a imagem do contêiner, enquanto isso você pode prosseguir e ler as próximas seções.

Assim que o contêiner estiver pronto, você verá `Dev Container: Node.js` no canto inferior esquerdo do Visual Studio Code:

![Captura de tela do VS Code mostrando o status do contêiner Dev](./assets/vscode-dev-container-status.png)

#### [opcional] Trabalhar localmente sem o contêiner de desenvolvimento

Se você deseja trabalhar localmente sem usar um contêiner de desenvolvimento (dev container), você precisa clonar o projeto e instalar as seguintes ferramentas:

|                  |                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Git              | [Download do Git](https://git-scm.com)                                                                           |
| Node.js v18+     | [Download do Node.js](https://nodejs.org)                                                                        |
| Azure CLI        | [Download do Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli#install)                         |
| GitHub CLI       | [Download do GitHub CLI](https://cli.github.com/manual/installation)                                             |
| Bash v3+         | [Download do Bash](https://www.gnu.org/software/bash/) (usuários Windows podem usar **Git bash** que vem do Git) |
| jq               | [Download jq](https://stedolan.github.io/jq/download)                                                            |
| Editor de Código | [Download do Visual Studio Code](https://aka.ms/get-vscode)                                                      |

Você pode testar a configuração abrindo um terminal e digitando:

```sh
git --version
node --version
az --version
gh --version
bash --version
jq --version
```

---

## Visão geral do projeto

O modelo de projeto que você copiou é um monorepo, um único repositório contendo vários projetos. Ele está organizado da seguinte forma (para os arquivos mais importantes):

```sh
.devcontainer/    # Configuração do Dev container
.github/          # Pipeline CI/CD do GitHub Actions
packages/         # Diferentes partes da nossa aplicação 
|- server/        # O server usando Express e hospedando a api e o site
+- client/        # O lado do client-side (website)
api.http          # Requisições HTTP para testar a nossa API
package.json      # Configuração do Gerenciador de pacotes do NPM
```

Como estaremos usando o Node.js para construir nossa API e website, [configuramos um espaço de trabalho NPM](https://docs.npmjs.com/cli/using-npm/workspaces) para gerenciar as dependências de todos os projetos em um único lugar. Isso significa que, quando você executar o comando `npm install` na raiz do projeto, ele instalará todas as dependências de todos os projetos e tornará mais fácil trabalhar em um monorepo.

Por exemplo, você pode executar `npm run <script_name> --workspaces` na raiz do projeto para executar um script em todos os projetos, ou `npm run <script_name> --workspace=packages/server` para executar um script para um projeto específico.

Caso contrário, você pode usar seus comandos `npm` normalmente em qualquer pasta de projeto e funcionará como de costume.

---

## Adicionando o Azure Cosmos DB

Nosso aplicativo Todo está *quase* completo. Precisamos adicionar um banco de dados para armazenar as tarefas, e usaremos o [Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) para isso, com a ajuda do GitHub Copilot.

<div class="info" data-title="About Azure Cosmos DB">

> *observação*: O Azure Cosmos DB é um serviço de banco de dados NoSQL totalmente gerenciado que oferece várias APIs, incluindo SQL, MongoDB, Cassandra, Gremlin e Armazenamento de Tabela do Azure. É um banco de dados distribuído globalmente, o que significa que seus dados podem ser replicados em várias regiões, e você pode escolher a região mais próxima de seus usuários para reduzir a latência. Para nossas necessidades, usaremos a API SQL juntamente com o SDK Node.js.
>
> Certamente, isso pode parecer um pouco estranho, usar SQL para acessar um banco de dados NoSQL? Mas não se preocupe, isso não é um erro. O Azure Cosmos DB é um banco de dados multimodelo. O que significa que ele pode suportar diferentes formas de acesso aos dados. SQL é a forma mais comum de consultar dados. Assim sendo bem familiar para a maioria das Pessoas Desenvolvedoras e tornando muito mais fácil para começar. Ainda assim, você não deve esquecer que não é um banco de dados relacional, então não é possível fazer consultas e junções muito complexas devido ao impacto em seu desempenho.

</div>

### Criando o serviço de banco de dados

Primeiramente, precisamos instalar o pacote `@azure/cosmos`:

```bash
cd packages/server
npm install @azure/cosmos
```

Depois que o pacote for instalado, crie uma nova pasta `packages/server/src/services/`. Dentro desta pasta, crie o arquivo `db.ts` e comece a digitar o seguinte conteúdo nele:

- arquivo: db.ts

```ts
// Importe o SDK Cosmos e o modelo da task(tarefa)
```

Assim que você terminar de digitar e pressionar enter, o Copilot sugerirá a primeira importação para você:

![Captura de tela do VS Code mostrando o Copilot sugerindo a importação](./assets/copilot-import.png)

<div class="tip" data-title="tip">

Se tudo estiver configurado corretamente, você verá o ícone do GitHub Copilot no canto inferior direito do seu editor mudando para um spinner enquanto digita. Se você não o vir, verifique se tem a [extensão do GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) instalada e ativada.

</div>

<details>
<summary>Exemplo de sugestões do Copilot</summary>

```ts
import { CosmosClient } from '@azure/cosmos';
import { Task } from "../models/task";
```

</details>

Aceite a sugestão pressionando a tecla `Tab`, pressione `Enter` e aceite a próxima sugestão novamente, se necessário, para ter ambas as importações de que precisamos.

Em seguida, continue adicionando o seguinte comentário:

```ts
// Crie uma classe DbService para encapsular o SDK Cosmos,
// conectando-se ao banco de dados 'todos' e ao contêiner 'tasks'
// e com métodos CRUD para tarefas
```

Depois de pressionar enter, e aceite as sugestões conforme elas aparecem: o Copilot deve sugerir uma definição de classe completa para você!

<details>
<summary>Exemplo de sugestões do Copilot</summary>

```ts
export class DbService {
  private client: CosmosClient;
  private database: any;
  private container: any;

  constructor() {
    // Connect to the database
    this.client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    });
    this.database = this.client.database("todos");
    this.container = this.database.container("tasks");
  }

  // Create a new task
  async createTask(task: Task): Promise<Task> {
    // Create a new task in the database
    const { resource: createdItem } = await this.container.items.create(task);

    // Return the new task
    return createdItem;
  }

  // Get a task by id
  async getTask(id: string): Promise<Task> {
    // Get the task from the database
    const { resource: task } = await this.container.item(id).read();

    // Return the task
    return task;
  }

  // Get all tasks
  async getTasks(): Promise<Task[]> {
    // Get all tasks from the database
    const { resources: tasks } = await this.container.items.readAll().fetchAll();

    // Return the tasks
    return tasks;
  }

  // Update a task
  async updateTask(task: Task): Promise<Task> {
    // Update the task in the database
    const { resource: updatedItem } = await this.container
      .item(task.id)
      .replace(task);

    // Return the updated task
    return updatedItem;
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    // Delete the task from the database
    await this.container.item(id).delete();
  }
}
```

</details>
</br>

<div class="info" data-title="note">

> O Copilot gera novo código dinamicamente para você. Portanto, a sugestão que você recebe pode ser um pouco diferente da mostrada aqui. Mas a ideia é a mesma: é uma definição completa de classe com todas as funções que você precisa implementar para o serviço de banco de dados. Se a sugestão não for do seu agrado, você também pode alternar entre diferentes sugestões usando `Alt+]` `(Option+] `no macOS).

</div>

Aceite a sugestão e, em seguida, se olharmos para os detalhes, o Copilot gerou para você:

- Uma definição de classe com um construtor que se conecta à instância do Azure Cosmos DB e cria o banco de dados e o contêiner, caso não existam.
- Todas as operações de criação, leitura, atualização e exclusão (CRUD) para as tarefas.

Incrível, não é mesmo?!

### Corrigindo o código

Mas espere, parece que o TypeScript está reclamando das variáveis `process.env.COSMOS_ENDPOINT` e `process.env.COSMOS_KEY` possivelmente serem indefinidas. Vamos corrigir isso, novamente usando o Copilot. No início do construtor da classe, adicione este comentário:

```ts
// Verifique se as variáveis de ambiente estão definidas
```

E, em seguida, pressione `Enter` várias vezes até obter o resultado desejado. O Copilot deve sugerir progressivamente o código para verificar as variáveis de ambiente.

<details>
<summary>Example Copilot suggestion</summary>

```ts
if (!process.env.COSMOS_ENDPOINT) {
  throw new Error("COSMOS_ENDPOINT is not set");
}
if (!process.env.COSMOS_KEY) {
  throw new Error("COSMOS_KEY is not set");
}
```

</details>

Agora olhe para os diferentes métodos que o Copilot gerou para nós. Embora pareça correto, gostaríamos de alterar o método `getTasks()` para que ele retorne apenas as tarefas para um ID de usuário especificado.

Para fazer isso, exclua completamente a função `getTasks()` e substitua-a pelo comentário `// Obter todas as tarefas para um usuário`. Em seguida, deixe o Copilot gerar o novo código para nós. Ele irá sugerir novo código linha por linha, aceite as sugestões conforme elas aparecem até que a função esteja completa.

<details>
<summary>Exemplo de sugestão do Copilot</summary>

```ts
async getTasks(userId: string): Promise<Task[]> {
  // Get the tasks from the database
  const { resources: tasks } = await this.container
    .items.query({
      query: "SELECT * FROM c WHERE c.userId = @userId",
      parameters: [{ name: "@userId", value: userId }]
    })
    .fetchAll();

  // Return the tasks
  return tasks;
}
```

</details>
</br>

O resultado final deve parecer conforme abaixo:

<details>
<summary>arquivo: db.ts</summary>

```ts
// Import Cosmos SDK and task model
import { CosmosClient } from "@azure/cosmos";
import { Task } from "../models/task";

// Create a DbService class to wrap the Cosmos SDK,
// connecting to the 'todos' database and 'tasks' container
// and with CRUD methods for tasks
export class DbService {
  private client: CosmosClient;
  private database: any;
  private container: any;

  constructor() {
    // Check that the environment variables are set
    if (!process.env.COSMOS_ENDPOINT) {
      throw new Error("COSMOS_ENDPOINT is not set");
    }
    if (!process.env.COSMOS_KEY) {
      throw new Error("COSMOS_KEY is not set");
    }

    // Connect to the database
    this.client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    });
    this.database = this.client.database("todos");
    this.container = this.database.container("tasks");
  }

  // Create a new task
  async createTask(task: Task): Promise<Task> {
    // Create a new task in the database
    const { resource: createdItem } = await this.container.items.create(task);

    // Return the new task
    return createdItem;
  }

  // Get a task by id
  async getTask(id: string): Promise<Task> {
    // Get the task from the database
    const { resource: task } = await this.container.item(id).read();

    // Return the task
    return task;
  }

  // Get all tasks for a user
  async getTasks(userId: string): Promise<Task[]> {
    // Get the tasks from the database
    const { resources: tasks } = await this.container
      .items.query({
        query: "SELECT * FROM c WHERE c.userId = @userId",
        parameters: [{ name: "@userId", value: userId }]
      })
      .fetchAll();

    // Return the tasks
    return tasks;
  }

  // Update a task
  async updateTask(task: Task): Promise<Task> {
    // Update the task in the database
    const { resource: updatedItem } = await this.container
      .item(task.id)
      .replace(task);

    // Return the updated task
    return updatedItem;
  }

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    // Delete the task from the database
    await this.container.item(id).delete();
  }
}
```

</details>
</br>

É claro que o Copilot é uma ferramenta incrível que pode nos economizar muito tempo e esforço, especialmente quando se trata de tarefas tediosas como escrever códigos boilerplate. Embora o código possa não ser perfeito, é um ótimo ponto de partida que podemos aprimorar e melhorar. Está faltando algumas definições de tipo, mas tendo em mente que só precisamos escrever alguns comentários para obter um serviço de banco de dados funcionando, isso por si só já é incrível! E nem precisamos ler a documentação do Cosmos SDK.

## Adicionando uma documentação

Falando em documentação, é sempre uma boa ideia adicionar alguns comentários ao seu código. Não apenas para outras Pessoas Desenvolvedoras. Mas, também para que você mesmo possa voltar ao seu código após algumas semanas ou meses e rever o que foi feito. Novamente, vamos usar o Copilot para nos ajudar com isso! 

Logo antes da definição da classe `DbService`, remova este comentário que adicionamos anteriormente:

```ts
// Crie uma classe DbService para encapsular o SDK Cosmos,
// conectando-se ao banco de dados 'todos' e ao contêiner 'tasks'
// e com métodos CRUD para tarefas
```

E em vez disso, comece a digitar `/**` para adicionar um comentário JSDoc e pressione enter. O Copilot começará a sugerir a documentação para a classe. Você pode começar a digitar `This` e pressionar `Tab` e, em seguida, Enter para aceitar as sugestões à medida que surgirem, até que a documentação esteja completa. Você deve terminar com algo parecido com isto:

```ts
/**
 * This class provides a service for interacting with the Cosmos DB database.
 * It is a singleton class, so only one instance of it will ever exist.
 * @class
 * @property {CosmosClient} client - The Cosmos DB client
 * @property {any} database - The database
 * @property {any} container - The container
 * @method createTask - Create a new task
 * @method getTask - Get a task by id
 * @method getTasks - Get all tasks for a user
 * @method updateTask - Update a task
 * @method deleteTask - Delete a task
 */
```

Nada mal, não é mesmo? Espere, ele até menciona algo que esquecemos: a classe `DbService` deve ser um singleton, pois não queremos criar várias conexões ao banco de dados. Vamos consertar isso.

Desta vez, vamos tentar usar um pouco de mágina aqui 👀.

Coloque o cursor no final desta linha na classe `DbService`:

```ts
private container: any;
```

Uau, agora ele até sugere os comentários para você! Aceite-os e continue até chegar ao que precisamos. Você deve terminar com algo assim:

```ts
// The singleton instance
private static instance: DbService;

// Get the singleton instance
public static getInstance(): DbService {
  if (!DbService.instance) {
    DbService.instance = new DbService();
  }
  return DbService.instance;
}
```

Você não concorda que isso parece uma grande mágica?! Nem mesmo dissemos ao Copilot o que queríamos e ele nos deu o código que precisávamos. Quão útil é isso?

### (Opcional) Corrigindo tipos que faltam com o Copilot Labs

Nosso serviço de banco de dados está quase perfeito agora, mas ainda há uma coisa que me incomoda: os tipos. Estamos usando `any` para as propriedades `database` e `container`, o que não é ideal. Poderíamos voltar à documentação do Cosmos SDK e tentar encontrar os tipos corretos, mas seria muito trabalhoso. Vamos ver se o Copilot pode nos ajudar com isso?

Na barra de ferramentas do Visual Studio Code, selecione `Copilot Labs`

![Screenshot of Copilot Labs tab in VS Code](./assets/copilot-labs.png)

Selecione as duas linhas problemáticas no seu código:

```ts
private database: any;
private container: any;
```

Assim que elas forem destacadas, clique no botão **Add types** no painel **Brushes**:

![Captura de tela do painel de pincéis do Copilot Labs no VS Code destacando o botão "Add Types".](./assets/copilot-labs-add-types.png)


O Copilot agora tentará encontrar os tipos corretos para suas variáveis. Levará alguns segundos, mas assim que terminar, você deve ver algo como isso:

```ts
private database: Database;
private container: Container;
```

<div class="info" data-title="note">

> O Copilot Labs ainda está em beta, então pode não funcionar perfeitamente todas as vezes que você for usar. Se isso acontecer, você sempre pode usar `CTRL+Z` (`CMD+Z` no macOS) para desfazer as alterações e tentar novamente.

</div>

TypeScript está nos mostrando um erro agora, porque estamos usando os tipos `Database` e `Container` do Cosmos SDK, mas não os importamos no arquivo. Clique na lâmpada azul para abrir as opções de correções rápidas do Visual Studio Code e selecione **Add all missing imports**:

![Captura do Visual Studio Code](./assets/vscode-auto-import.png)

Oh não, uma vez que fazemos isso, obtemos novos erros! Parece que os tipos de retorno dos métodos `createTask()` e `updateTask()` estão errados. Substitua de `Promise<Task>` por `Promise<Task | undefined>` para ambos os métodos e você deve estar pronto para seguir em frente.

Obrigado(a) pela observação, TypeScript! 🙏

---

## Adicionando Testes Unitários

Agora temos um serviço de banco de dados funcional, mas não temos nenhum teste para ele. Nós somos boas Pessoas Desenvolvedoras. Então sempre devemos escrever testes para nosso código. Vamos ver como o Copilot pode nos ajudar com isso?

Primeiro, crie um novo arquivo `packages/server/src/services/db.spec.ts` e adicione o seguinte código:

<details>
<summary>packages/server/src/services/db.spec.ts</summary>

```ts
import { DbService } from './db';

jest.mock('@azure/cosmos');

describe('DbService', () => {
  beforeAll(() => {
    // Set environment variables
    process.env.COSMOS_ENDPOINT = 'dummy';
    process.env.COSMOS_KEY = '123';

  });

  it('should get all tasks for a user', async () => {
    const dbService = new DbService();
    const tasks = await dbService.getTasks('123');
    expect(tasks).toEqual([]);
  });

});
```

</details>
</br>

<div class="tip" data-title="tip">

> Estamos usando o [Jest](https://jestjs.io/) como nosso framework de testes. Se você não está familiarizado com ele, não se preocupe, não vamos entrar em muitos detalhes aqui. Você pode ler mais sobre isso na [documentação do Jest](https://jestjs.io/docs/getting-started).

</div>

Preparamos algumas coisas aqui. Estamos simulando o Cosmos SDK, pois não queremos usar a coisa real, e estamos definindo as variáveis ​​de ambiente necessárias para a classe `DbService`. Em seguida, escrevemos um primeiro teste para o método `getTasks()`.

### Completando o teste suite

Primeiro, vamos adicionar alguns testes. Coloque o cursor no final da função `describe()` e pressione `Enter` para criar um novo teste.

![Captura de tela Copilot dando sugestão de um novo teste](./assets/copilot-test-suggestion.png)

<div class="tip" data-title="tip">

> Se você estiver obtendo resultados muito diferentes do que é mostrado aqui, pode tentar adicionar o comentário `// Testar criar uma nova task` e começar um novo teste com `it()`. Às vezes, quando o Copilot não faz o que você deseja, dar algumas dicas ajuda a obter os resultados desejados.

</div>

Se você continuar aceitando as sugestões do Copilot, você deverá terminar com um conjunto completo de testes para todos os métodos da classe `DbService`. Note que às vezes o Copilot precisa de um pouco de ajuda, para começar a escrever o teste ou fechar os parênteses finais de cada teste. Às vezes, pode parecer que ele tem vontade própria, apenas para ter certeza de que você está prestando atenção 😉.

<details>
<summary>Exemplo de sugestão do Copilot</summary>

```ts
it('should create a new task', async () => {
  const dbService = new DbService();
  const task = await dbService.createTask({
    id: '123',
    userId: '123',
    title: 'test',
    completed: false
  });
  expect(task).toEqual({
    id: '123',
    userId: '123',
    title: 'test',
    completed: false
  });
});

it('should get a task by id', async () => {
  const dbService = new DbService();
  const task = await dbService.getTask('123');
  expect(task).toEqual({
    id: '123',
    userId: '123',
    title: 'test',
    completed: false
  });
});

it('should update a task', async () => {
  const dbService = new DbService();
  const task = await dbService.updateTask({
    id: '123',
    userId: '123',
    title: 'test',
    completed: true
  });
  expect(task).toEqual({
    id: '123',
    userId: '123',
    title: 'test',
    completed: true
  });
});

it('should delete a task', async () => {
  const dbService = new DbService();
  const task = await dbService.deleteTask('123');
  expect(task).toEqual({
    id: '123',
    userId: '123',
    title: 'test',
    completed: true
  });
});
```

</details>
</br>

Já que mockamos completamente o Cosmos SDK com `jest.mock()`, todos os testes devem falhar. Execute o seguinte comando em um terminal para executar os testes:

```bash
npm test
```

Como esperado, ele falha. Mas isso é uma coisa boa, pois escrever bons testes é sobre falhar todos os testes logo de primeira!

### Fazendo mock dos métodos do Cosmos SDK

Para fazer funcionar, precisamos implementar corretamente as simulações para os métodos do Cosmos SDK. Coloque o cursor no final da função `beforeAll()` e pressione `Enter`.

![Captura de tela da sugestão do Copilot em relação ao mock do Cosmos SDK](./assets/copilot-mock-suggestion.png)

Uau, o Copilot parece saber o que queremos fazer! Vamos aceitar este comentário.
Desta vez, em vez de aceitar a primeira sugestão, vamos abrir o **Copilot toolbar** para ver todas as sugestões e escolher a que nos parece melhor.

![Captura do Copilot toolbar](./assets/copilot-toolbar.png)

Um novo painel deve ser aberto no lado direito da tela, onde você pode rolar por todas as sugestões que o Copilot tem para você. Depois de encontrar a que você gosta, clique em **Accept Solution** para inserir o código e fechar o painel.

Salve o arquivo e execute os testes novamente. Oh não, 4 dos 5 testes ainda estão falhando! Vamos ver o que está acontecendo.

Role para cima para ver a primeira falha no teste e você verá que `fetchAll()` não é uma função, o que significa que não foi mockada corretamente. Vamos corrigir isso.

![Captura de tela da saída do Jest mostrando a primeira falha de teste](./assets/jest-test-failure.png)

No método que está mockado `query()`, remova esta linha `resources: []` de sua implementação atual e aguarde o Copilot sugerir algo.

![Captura de tela do Copilot sugerindo uma nova linha de código](./assets/copilot-mock-fix-suggestion.png)

<details>
<summary>Example Copilot suggestion</summary>

```ts
fetchAll: () => ({
  resources: []
})
```

</details>
</br>

Sim, é isso mesmo! O Copilot acompanhou e está corrigindo seu próprio erro!
Vamos aceitar as sugestões até que esteja completo e executar os testes novamente. Desta vez, os últimos 3 testes falham. Vamos ver o que está acontecendo com o primeiro.

![Captura de tela mostrando a saída do jest com o teste falhando.](./assets/jest-test-failure-2.png)

Okay, parece que houve um pequeno erro, já que `container.item` não está sendo mockado corretamente e, olhando para os mocks gerados pelo Copilot, tudo foi adicionado à propriedade `items`, e não `item`. Vamos corrigir isso.

Abaixo da chave de fechamento da propriedade `items`, adicione este código (o Copilot pode sugerir para você):

```ts
item: () => ({

}),
```

Então mova os métodos `read()`, `upsert()` e `delete()` do bloco items para o bloco item que acabamos de adicionar.

Você deve acabar com algo parecido com isto:


```ts
const mockClient = {
  database: () => ({
    container: () => ({
      items: {
        create: () => ({
          resource: {
            id: '123',
            userId: '123',
            title: 'test',
            completed: false
          }
        }),
        query: () => ({
          fetchAll: () => ({
            resources: []
          })
        }),
      },
      item: () => ({
        read: () => ({
          resource: {
            id: '123',
            userId: '123',
            title: 'test',
            completed: false
          }
        }),
        upsert: () => ({
          resource: {
            id: '123',
            userId: '123',
            title: 'test',
            completed: true
          }
        }),
        delete: () => ({})
      }),
    })
  })
};
```

Execute os testes novamente e... um último erro!

![Captura de tela da saída do Jest mostrando a terceira falha de teste.](./assets/jest-test-failure-3.png)

Isso mesmo! O Copilot fez o mock do método `upsert()`, mas não fez o mock do método `replace()`. Basta renomear `upsert` para `replace` e desta vez, todos os testes devem passar!

Vimos neste exemplo que o Copilot pode nos ajudar a escrever testes e mocks. Porém, não pode fazer tudo sozinho. Ele precisa de algum contexto para sugerir o código correto e, às vezes, precisamos ajudá-lo um pouco.
No final, ainda temos nossa suíte de testes escrita com muito pouco esforço e tempo!

---

### Atualizar as rotas da API

O serviço de banco de dados está completo e totalmente testado, agora podemos atualizar nossas rotas de API para usá-lo.

Abra o arquivo `packages/server/src/routes/index.ts` e dê uma olhada rápida nele. Já criamos todas as rotas que precisamos, mas a implementação é toda falsa e com comentários `TODO` por todos os lugares, pois ainda não tínhamos o serviço de banco de dados pronto.

Hora de remover todos os *TODOs*!

### Importando o serviço da base de dados

Primeiro, precisamos importar nosso serviço de banco de dados. No topo do arquivo, adicione a seguinte linha após as outras importações:


```ts
import { DbService } from '../services/db';
```

### Remove os stubs

#### Get tasks (Retornar tasks)

Em seguida, avance para o nosso primeiro TODO: `// TODO: retorne as tasks da base de dados`
Na linha abaixo, substitua o lado direito da atribuição por `await DbService.getInstance`. Conforme você digita, o Copilot deve completar o código para você.

![Captura de tela do Copilot completando o código](./assets/copilot-dbservice-1.png)

Aceite a sugestão e você concluiu o primeiro TODO, agora pode remover o comentário.

#### Create task (Criar tarefa)

Mova-se para o próximo TODO, `// TODO: crie uma task na base de dados`.

Na linha abaixo, apenas digite await e Copilot deve fazer sua mágica novamente:


![Captura de tela do Copilot completando o código](./assets/copilot-dbservice-2.png)

Aceite a sugestão. Mas espere, algo está faltando aqui, não estamos verificando se a tarefa fornecida é válida! Vamos garantir que a tarefa tenha um `title` seja definido antes de adicioná-la ao banco de dados.

Logo antes do comentário TODO, adicione o comentário `// Verificar se a task possui um title`, pressione `Enter` e veja o que o Copilot sugere. Aceite as sugestões até que esteja completo.

<details>
<summary>Exemplo de sugestão do Copilot</summary>

```ts
// Check that the task has a title
if (!task.title) {
  return res.status(400).json({ error: 'Task title is required' });
}
```

</details>
</br>

É isso aí! Copilot, fez exatamente o que precisávamos! Podemos remover este comentário TODO e seguir para o próximo.

#### Retornar task por Id

O próximo TODO é `// TODO: obter uma task do banco de dados`.
Agora você sabe o que fazer, substitua a parte da direita da atribuição abaixo por `await` e deixe o Copilot completar isso para você.

![Captura de tela do Copilot completando o código](./assets/copilot-dbservice-3.png)

Remova o comentário TODO e vamos para a próxima sessão. 

#### Atualizar task

O próximo TODO é `// TODO: obter uma task existente no banco de dados.`
Da mesma forma que antes, substitua a parte da direita da atribuição abaixo por `await` e deixe o Copilot completar isso para você.

![Captura de tela do Copilot completando o código](./assets/copilot-dbservice-4.png)

Agora, faça a mesma coisa novamente para o próximo TODO, `// TODO: atualizar uma task no banco de dados`.

![Captura de tela do Copilot completando o código](./assets/copilot-dbservice-5.png)


Remova o comentário TODO e vamos para a última rota.

#### Excluir task

Por último, faremos o mesmo procedimento novamente para o TODO `// TODO: excluir uma task no banco de dados`. Na linha abaixo do comentário, digite apenas await e deixe o Copilot completá-lo para você.

![Captura de tela do Copilot completando o código](./assets/copilot-dbservice-6.png)

Remova o comentário final do TODO e nossa API agora está completa.
Não deu muito trabalho, concordam comigo?

---

## Implantando a aplicação ao Azure

Nossa aplicação de lista de tarefas agora está completo. Agora é a hora de implantarmos no Azure!

O Azure é a plataforma de nuvem da Microsoft. Ele fornece uma ampla gama de serviços para construir, implantar e gerenciar aplicações. Vamos usar o [Azure App Service](https://azure.microsoft.com/products/app-service) para implantar nossa aplicação.

### Criando uma Conta no Azure

Primeiro, você precisa ter certeza de que tem uma conta no Azure. Se você não tiver uma, poderá criar uma [conta gratuita do Azure](https://azure.microsoft.com/free/).

> Se você for estudante ou professor, você pode se qualificar para uma [conta gratuita do Azure para estudantes](https://azure.microsoft.com/free/students/). Essa conta não há necessidade de fornecer um cartão de crédito e você pode usar o Azure por até 12 meses.

### Configurando as Credenciais do Azure

Depois de ter sua conta do Azure, abra um terminal na raiz do projeto e execute:

```bash
./setup.sh
```

Este script usa a [Azure CLI](https://learn.microsoft.com/cli/azure) e a [GitHub CLI](https://cli.github.com/) para fazer o seguinte:

- Fazer login na sua conta do Azure
- Selecionar uma assinatura para começar a usar o Azure
- Criar um [service principal](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal), um token que será usado para criar ou atualizar recursos no Azure
- Fazer login na sua conta do GitHub
- Adicionar o segredo `AZURE_CREDENTIALS` ao repositório do seu GitHub, com o token do service principal.

Você está pronto(a) para realizar a implantação desde o GitHub.#

### Adicionando o fluxo de trabalho de CI/CD

Nosso código e repositório estão prontos. Então é hora de escrever o fluxo de implantação. Usaremos o [GitHub Actions](https://github.com/features/actions) para criar um fluxo de trabalho de CI/CD.

<div class="info" data-title="note">

> CI/CD significa *Integração Contínua e Implantação Contínua*.
> A Integração Contínua é uma prática de desenvolvimento de software que requer que os desenvolvedores integrem seu código em um repositório compartilhado várias vezes ao dia. Cada integração pode então ser verificada por uma construção automatizada e testes automatizados. Fazendo isso, você pode detectar erros rapidamente e localizá-los mais facilmente.
> A Implantação Contínua leva essa prática ainda mais longe, preparando-se para um lançamento na produção após cada construção bem-sucedida. Dessa forma, você pode colocar software funcional nas mãos dos usuários mais rapidamente.

</div>

#### O que é GitHub Actions?

GitHub Actions é um serviço que permite automatizar fluxos de trabalho de desenvolvimento de software. Um fluxo de trabalho é uma série de etapas executadas uma após a outra. Você pode usar fluxos de trabalho para criar, testar e implantar seu código. Mas, também pode ser usados para automatizar outras tarefas, como por exemplo enviar uma notificação quando um problema é criado.

É uma ótima maneira de automatizar suas pipelines de CI/CD e é gratuito para repositórios públicos.

#### Criando um fluxo de trabalho

Para configurar o GitHub Actions para implantação, precisaremos criar um novo arquivo de fluxo de trabalho em nosso repositório. Este arquivo conterá as instruções para nossa pipeline de CI/CD.

Crie um novo arquivo em seu repositório com o caminho .`github/workflows/deploy.yml` e adicione o seguinte conteúdo:

```yml
# This workflow for our node.js 18 app does the following:
# - run tests
# - build the app
# - login to Azure with AZURE_CREDENTIALS github secret
# - run Azure CLI command to deploy
```

Depois de dar `Enter`, o Copilot pode tentar completar os comentários, mas não é isso que queremos. Então ignore se for esse o caso pressionando `Enter` novamente. Ele não deve começar a completar o fluxo de trabalho, continue aceitando sugestões até acabar com algo como isto:

```yaml
# This workflow for our node.js 18 app does the following:
# - run tests
# - build the app
# - login to Azure with AZURE_CREDENTIALS github secret
# - run Azure CLI command to deploy

name: Deploy to Azure

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 18
        uses: actions/setup-node@v2
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - name: Deploy to Azure
        run: |
          az webapp up -n ${{ secrets.AZURE_WEBAPP_NAME }} -g ${{ secrets.AZURE_RESOURCE_GROUP }} --sku F1
```

Nada mal! O Copilot fez um excelente trabalho aqui! Porém, precisamos fazer algumas mudanças para fazer isso funcionar!

#### Atualizando os comandos de implantação

O último comando não é suficiente para implantar nossa aplicação, já que também precisamos criar um banco de dados Azure Cosmos DB e definir a string de conexão.

Remova completamente o comando e vamos passo a passo perguntar ao Copilot o que precisamos. Adicione este primeiro comentário:

```bash
# Crie um resource group rg-copilot-nodejs-todo
```

Digite `Enter` e o Copilot deve sugerir o comando abaixo:

```bash
az group create --name rg-copilot-nodejs-todo --location eastus
```

Aceita! Agora adicione o comentário abaixo para criar uma base de dados:

```bash
# Crie um cosmosdb com api default
```

O Copilot deverá apresentar algo parecido com isto:

```bash
az cosmosdb create --name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo
```

Ótimo! Aceite a sugestão e continue com este comentário:

```bash
# Crie uma base de dados chamado todos com uma collection chamada tasks
```

O Copilot deve sugerir algo parecido com estas duas linhas:

```bash
az cosmosdb sql database create --name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --db-name todos
az cosmosdb sql container create --name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --db-name todos --collection-name tasks --partition-key-path /_partitionKey --throughput 400
```

Infelizmente, apesar de parecer algo que poderia funcionar, mas não é. pois os nomes das opções estão incorretos. Talvez seja um sinal de que o comando `az cosmosdb` na linha de comando possa ser melhorado para ser mais intuitivo. Mas de qualquer maneira, vamos corrigir. Mude essas duas linhas para:

```bash
az cosmosdb sql database create --account-name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --name todos
az cosmosdb sql container create --account-name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --database-name todos --name tasks --partition-key-path /id --throughput 400
```

Como você pode ver, é muito sutil e a opção `--name` tem significados diferentes aqui. Provavelmente é isso que pegou o Copilot desprevenido. É um ótimo lembrete de que você sempre deve verificar o que ele sugere. Pois às vezes pode estar um pouco errado. É por isso que você está fazendo um Pair Programming com ele, certo?

Vamos continuar adicionando este comentário:

```bash
# Implante a aplicação com webapp usando node 18
```

Agora, se você sugerir um comando semelhante ao que fez na primeira vez:

```bash
az webapp up --sku F1 --name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --runtime "node|18-lts"
```

Novamente, aceite a sugestão, mas precisaremos ajustar um pouco a opção `--name` para torná-la única. Pois ela também servirá como URL para o seu aplicativo da web. Altere para algo como: `--name nodejs-todo-YOUR_GITHUB_USERNAME`.

Agora, precisamos recuperar o endpoint e a chave do Azure Cosmos DB. Adicione este comentário:

```bash
# Recuperar o endpoint do Cosmos
```

O Copilot deve sugerir algo como do tipo:

```bash
cosmos_endpoint=$(az cosmosdb show --name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --query documentEndpoint --output tsv)
```

Aceite a sugestão. Agora precisamos da chave! Pressione `Enter` para ir para a próxima linha e o Copilot pode até sugerir o próximo comentário para você (se não, adicione-o):

```bash
# Recuperar a chave do Cosmos
```

Novamente você deve aceitar a sugestão e deverá aparecer algo como:

```bash
cosmos_key=$(az cosmosdb keys list --name copilot-nodejs-todo --resource-group rg-copilot-nodejs-todo --query primaryMasterKey --output tsv)
```

Calma! Estamos quase lá! Finalmente, precisamos configurar as variáveis de ambiente no web app. Adicione o comentário:

```bash
# Definir as variáveis do Cosmos no aplicativo da web.
```

E o Copilot deve sugerir algo como:

```bash
az webapp config appsettings set --name nodejs-todo-sinedied --resource-group rg-copilot-nodejs-todo --settings COSMOS_ENDPOINT=$cosmos_endpoint COSMOS_KEY=$cosmos_key
```

Verifique se os nomes das configurações são `COSMOS_ENDPOINT` e `COSMOS_KEY`.
Tudo certo! Agora devemos estar prontos para implantar a aplicação.

### Implantando a Aplicação

O fluxo de trabalho agora está completo. Agora é hora de testar e ver se está funcionando conforme o esperado.

Comite todas as alterações que você fez no repositório e faça um `push`, usando o Visual Studio Code ou a linha de comando:

```bash
git add .
git commit -m "Setup CI/CD"
git push
```

O fluxo de trabalho será executado automaticamente. Assim sendo, podemos ver seu progresso diretamente no GitHub. Abra seu repositório em um navegador com este comando:

```bash
gh repo view -w
```

Selecione a guia **Actions** e você verá o fluxo de trabalho sendo executado. Levará alguns minutos para ser concluído. Se você desejar, pode pegar até pegar uma xícara de café ☕. Você pode acompanhar o progresso nos registros clicando em: **running workflow**.

![Captura de tela mostrando o fluxo de trabalho do GitHub Actions em execução](./assets/gh-actions.png)

Em seguida, selecione o nome da tarefa **build** (ou qualquer outro nome que o Copilot tenha sugerido) à esquerda e você verá os registros do fluxo de trabalho.

![Captura de tela mostrando os registros do fluxo de trabalho do GitHub Actions](./assets/gh-workflow-details.png)

Quando o fluxo de trabalho for concluído, você verá uma marca de verificação verde.

### Testando a aplicação

Depois que sua implantação estiver concluída, você finalmente pode testar a aplicação abrindo a URL do Web App em um navegador. Você pode encontrar a URL nos registros do fluxo de trabalho ou usando esses comandos:

```bash
az webapp show \
  --name "nodejs-todo-YOUR_GITHUB_USERNAME" \
  --resource-group "rg-copilot-nodejs-todo" \
  --query "defaultHostName" \
  --output tsv
```

Abra a URL retornada pelo comando e você verá o site.

![Captura de tela mostrando o site implantado](./assets/app-deployed.png)

---

## Conclusão

E é isso, pessoal! Chegamos ao fim do workshop. Como já comentado, nós estamos fazendo Pair Programming com o Copilot. Mas, sejamos honestos, às vezes nos sentimos mais como assistentes! Já que o Copilot fez a maior parte do trabalho duro para nós. Como em qualquer sessão de Pair Programming, ainda tivemos que verificar o que o Copilot estava fazendo e o guiar na direção certa. Mas, no geral, em questão de minutos, conseguimos concluir e implantar nossa aplicação com o mínimo esforço.

Esperamos que você tenha gostado de seguir o workshop, aprendido algo novo e o mais importante: que possa levar essa experiência de volta para seus projetos.

Se você perdeu algum dos passos ou gostaria de verificar seu código final, pode executar este comando no terminal para obter a solução concluída (certifique-se de comitar seu código primeiro!): 

```curl
curl -fsSL https://github.com/Azure-Samples/copilot-nodejs-todo/releases/download/latest/solution.tar.gz | tar -xvz
```

<div class="warning" data-title="had issues?">

> Se você encontrou algum problema durante o workshop, nos informe criando [uma issue no repositório do GitHub](https://github.com/Azure-Samples/copilot-nodejs-todo/issues).

</div>

## Excluindo os Recursos do Azure

<div class="important" data-title="important">

> Não se esqueça de excluir os recursos do Azure quando terminar o workshop para evitar custos desnecessários!

</div>

Para excluir os recursos do Azure, você pode executar este comando:

```bash
az group delete --name rg-copilot-nodejs-todo --yes --no-wait
```

### Link e Referências Importantes

- URL desse workshop (inglês): [aka.ms/ws/copilot-todo](https://aka.ms/ws/copilot-todo)
- O código desenvolvido desse workshop: [Link do GitHub](https://github.com/Azure-Samples/copilot-nodejs-todo)
- O template de base para esse workshop: [Link do GitHub](https://github.com/Azure-Samples/copilot-nodejs-todo-template)
- E, se algo no código não funcionar: [Reporta uma issue](https://github.com/Azure-Samples/copilot-nodejs-todo/issues)



