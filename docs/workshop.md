---
short_title: Using Copilot with Node.js and Azure
description: Discover how to use GitHub Copilot to quickly build a Node.js application with Azure Cosmos DB and App Service.
type: workshop
authors: Yohan Lasorsa
contacts: '@sinedied'
banner_url: assets/copilot-banner.jpg_TODO
duration_minutes: 20
audience: students, devs
level: intermediate
tags: github copilot, node.js, azure, express, javascript, typescript, app service, cosmos db, github actions, github codespaces
published: false
wt_id: javascript-0000-yolasors
sections_title:
  - Introduction
---

# Using GitHub Copilot to quickly build a Node.js application with Azure Cosmos DB and App Service

In this workshop, we'll explore how GitHub Copilot can be used to accelerate the development and deployment of a Node.js application. 

MyTodo is an [Express](https://expressjs.com/) app implementing a Todo list application. The application is mostly done, but needs a data service to talk to [Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) so we can store and retrieve the data. We also need to write some documentation, complete the tests and connect it to our API. Finally, we'll setup a CI/CD pipeline to deploy our app to [Azure App Service](https://azure.microsoft.com/services/app-service/), using [GitHub Actions](https://github.com/features/actions).

## Objectives

You'll learn how to:
- Use [GitHub Copilot](https://github.com/features/copilot) to assist you in writing code, tests and documentation
- Create a data service to connect to Azure Cosmos DB
- Setup a CI/CD pipeline with GitHub Actions
- Deploy a Node.js app to Azure App Service

## Prerequisites

| | |
|----------------------|------------------------------------------------------|
| GitHub account       | [Get a free GitHub account](https://github.com/join) |
| Azure account        | [Get a free Azure account](https://azure.microsoft.com/free) |
| A web browser        | [Get Microsoft Edge](https://www.microsoft.com/edge) |
| JavaScript knowledge | [JavaScript tutorial on MDN documentation](https://developer.mozilla.org/docs/Web/JavaScript)<br>[JavaScript for Beginners on YouTube](https://www.youtube.com/playlist?list=PLlrxD0HtieHhW0NCG7M536uHGOtJ95Ut2) |

We'll use [GitHub Codespaces](https://github.com/features/codespaces) to have an instant dev environment already prepared for this workshop.

If you prefer to work locally, we'll also provide instructions to setup a local dev environment using either VS Code with a [dev container](https://aka.ms/vscode/ext/devcontainer) or a manual install of the needed tools.

---

## Preparation

Before starting the development, we'll need to setup our project and development environment. This includes:

- Setting up GitHub Copilot on your account
- Creating a new project on GitHub based on a template
- Using a prepared dev container environment on either [GitHub Codespaces](https://github.com/features/codespaces) or [VS Code with Dev Containers extension](https://aka.ms/vscode/ext/devcontainer) (or a manual install of the needed tools)

### Set up GitHub Copilot

To use GitHub Copilot, you need to either enroll as an individual or use Copilot for Business:   [see GitHub Copilot plans](https://github.com/features/copilot#pricing). If you're not already enrolled, you can start a free trial at the URL above.

Once you're enrolled, you need to sign up for the [GitHub Copilot Labs](https://githubnext.com/projects/copilot-labs/) program. This will give you access to new experimental features we'll use in this workshop.

To sign up, go to [GitHub Copilot Labs](https://githubnext.com/projects/copilot-labs/) and select **Sign up for Copilot Labs**. Follow the instructions to activate it on your GitHub account and you're all set!

### Create the project

Open [this GitHub repository](https://github.com/azure-samples/copilot-nodejs-todo-template), select the **Fork** button and click on **Create fork** to create a copy of the project in your own GitHub account.

![Screenshot of GitHub showing the Fork button](./assets/fork-project.png) TODO

Once the fork is created, select the **Code** button, then the **Codespaces** tab and click on **Create Codespaces on main**.

![Screenshot of GitHub showing the Codespaces creation](./assets/create-codespaces.png)

This will start the creation of a dev container environment, which is a pre-configured container with all the needed tools installed. Once it's ready, you have everything you need to start coding. It even ran `npm install` for you!

<div class="info" data-title="note">

> Codespaces includes up to 60 hours of free usage per month for all GitHub users, see [the pricing details here](https://github.com/features/codespaces).

</div>

#### [optional] Work locally with the dev container

If you prefer to work locally, you can also run the dev container on your machine. If you're fine with using Codespaces, you can skip directly to the next section.

To work on the project locally using a dev container, first you'll need to install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/), then install the [Dev Containers](https://aka.ms/vscode/ext/devcontainer) extension.

<div class="tip" data-title="tip">

> You can learn more about Dev Containers in [this video series](https://learn.microsoft.com/shows/beginners-series-to-dev-containers/). You can also [check the website](https://containers.dev) and [the specification](https://github.com/devcontainers/spec).

</div>

After that you need to clone the project on your machine:

1. Select the **Code** button, then the **Local** tab and copy your repository url.

![Screenshot of GitHub showing the repository URL](./assets/github-clone.png) TODO

2. Open a terminal and run:

```bash
git clone <your_repo_url>
```

3. Open the project in VS Code, open the **command palette** with `Ctrl+Shift+P` (`Command+Shift+P` on macOS) and enter **Reopen in Container**.

![Screenshot of VS Code showing the "reopen in container" command](./assets/vscode-reopen-in-container.png)

The first time it will take some time to download and setup the container image, meanwhile you can go ahead and read the next sections.

Once the container is ready, you will see "Dev Container: Node.js" in the bottom left corner of VSCode:

![Screenshot of VS Code showing the Dev Container status](./assets/vscode-dev-container-status.png)

#### [optional] Work locally without the dev container

If you want to work locally without using a dev container, you need to clone the project and install the following tools:

| | |
|---------------|--------------------------------|
| Git           | [Get Git](https://git-scm.com) |
| Node.js v18+  | [Get Node.js](https://nodejs.org) |
| Azure CLI     | [Get Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli#install) |
| GitHub CLI    | [Get GitHub CLI](https://cli.github.com/manual/installation) |
| pino-pretty log formatter | [Get pino-pretty](https://github.com/pinojs/pino-pretty#install) |
| Bash v3+      | [Get bash](https://www.gnu.org/software/bash/) (Windows users can use **Git bash** that comes with Git) |
| Perl v5+      | [Get Perl](https://www.perl.org/get.html) |
| jq            | [Get jq](https://stedolan.github.io/jq/download) |
| A code editor | [Get VS Code](https://aka.ms/get-vscode) |

You can test your setup by opening a terminal and typing:

```sh
git --version
node --version
az --version
gh --version
bash --version
perl --version
jq --version
```

---

## Overview of the project

The project template you forked is a monorepo, a single repository containing multiple projects. It's organized as follows (for the most important files):

```sh
.azure/           # Azure infrastructure templates and scripts
.devcontainer/    # Dev container configuration
.github/          # GitHub Actions CI/CD pipeline
packages/         # The different parts of our app
|- server/        # The Express server, hosting the API and the website
+- client/        # The website client
api.http          # HTTP requests to test our API
package.json      # NPM workspace configuration
```

As we'll be using Node.js to build our API and website, we've setup a [NPM workspace](https://docs.npmjs.com/cli/using-npm/workspaces) to manage the dependencies of all the projects in a single place. This means that when you run `npm install` in the root of the project, it will install all the dependencies of all the projects and make it easier to work in a monorepo.

For example, you can run `npm run <script_name> --workspaces` in the root of the project to run a script in all the projects, or `npm run <script_name> --workspace=packages/server` to run a script for a specific project. 

Otherwise, you can use your regular `npm` commands in any project folder and it will work as usual.

<!-- ### About the codebase

We generated the base code of our differents services with the respective CLI or generator of the frameworks we'll be using, with very few modifications made so we can start working quickly on the most important parts of the workshop.

The only changes we made to the generated code is to remove the files we don't need, configure the ports for each API, and setup [pino-http](https://github.com/pinojs/pino-http) as the logger to have a consistent logging format across all the services.

<div class="info" data-title="note">

> If you want to see how the services were generated and the details of the changes we made, you can look at [this script](https://github.com/Azure-Samples/nodejs-microservices/blob/main/scripts/create-projects.sh) we used to generate the projects.

</div> -->

---

## Add CosmosDB to your project

Our Todo application is *almost* complete. We need to add a database to store the tasks, and we'll use [Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) to do that, with the assistance of GitHub Copilot.

### About Azure Cosmos DB

Azure Cosmos DB is a fully managed NoSQL database service that offers multiple APIs, including SQL, MongoDB, Cassandra, Gremlin, and Azure Table storage. It's a globally distributed database, which means that your data can be replicated across multiple regions, and you can choose the closest region to your users to reduce latency. For our needs, we'll be using the SQL API along with the Node.js SDK. 

Surely, that may sound a bit strange, using SQL to access a NoSQL database? But don't worry, it's not a mistake. Cosmos DB is a *multi-model database*, which means that it can support different ways of accessing the data. SQL is the most common way of querying data, so it feels familiar to most developers and makes it easy to get started. Still, you must not forget that it's not relational database, so you can't make very complex queries and joins have to be avoided because of their performance impact.

### Create the database service

First, we need to install the `@azure/cosmos` package:

```bash
cd packages/server
npm install @azure/cosmos
```

Once it's installed the package, create a new folder `packages/server/src/services/`. Inside this folder create the file `db.ts` and start typing the following content in it:

```ts
// Import Cosmos SDK and task model
```

As soon as you finish typing and hit enter, Copilot will suggest the import for you:

![Screenshot of VS Code showing Copilot suggesting the import](./assets/copilot-import.png)

<div class="tip" data-title="tip">

> If you have everything setup correctly, you should see the GitHub Copilot icon in the bottom right corner of your editor changing to a spinner as you type. If you don't see it, make sure you have the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) installed and enabled.

</div>

<details>
<summary>Example Copilot suggestions</summary>

```ts
import { CosmosClient } from '@azure/cosmos';
import { Task } from "../models/task";
```

</details>

Accept the suggestion by hitting the `Tab` key, hit `Enter` and accept the next suggestion again if needed to have both the imports we need.

Then continue by adding the following comment:

```ts
// Create a DbService class to wrap the Cosmos SDK,
// connecting to the 'todos' database and 'tasks' container
// and with CRUD methods for tasks
```

After hitting enter, and accept the suggestions as they come: Copilot should suggest a complete class definition for you!

<details>
<summary>Example Copilot suggestion</summary>

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

<div class="info" data-title="note">

> Copilot generates new code for you dynamically, so the suggestion you get might be a bit different from the one shown here. But the idea is the same: it's a complete class definition with all the functions you need to implement the database service. If the suggestion is not to your liking, you can also cycle between differents suggestions using `Alt+]` (`Option+]` on macOS).

</div>

Accept the suggestion, then if we look at the details, Copilot generated for you:
- A class definition with a constructor that connects to the Cosmos DB instance, and creates the database and container if they don't exist.
- All create, read, update, and delete (CRUD) operations for the tasks

How awesome is that?

### Fix the code

But wait, it seems that TypeScript is complaining about the `process.env.COSMOS_ENDPOINT` and `process.env.COSMOS_KEY` variables being possibly undefined. Let's fix that, again using Copilot. At the beginning of the class constructor, add this comment:

```ts
// Check that the environment variables are set
```

And then hit enter, multiple times until you get the wanted result. Copilot should progressively suggest the code to check the environment variables.

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

Now look at the different methods Copilot generated for us. While it all looks correct, we would like to change the `getTasks()` method so that it only returns the tasks for a specified user ID.

To do that, replace the `// Get all tasks` comment above the function with `// Get all tasks for a user`.
Delete the `getTasks()` method entirely, and let Copilot generate it again for us. It will suggest new code line by line, accept the suggestions as they come until the function is complete.

<details>
<summary>Example Copilot suggestion</summary>

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

The final result should look like this:

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

Of course, the code might not perfect (remember that the suggestions you get may be a bit different), but it's a good start given the little effort we had to put in. It's missing some type definitions, but keeping in mind that we only had to write a few comments to get a working database service, it's pretty amazing! And we didn't even had to go read the documentation of the Cosmos SDK.

### Add documentation

Speaking of documentation, it's always a good idea to add some comments to your code. Not only for other developers, but also for yourself when you come back to your code after a few weeks or months. Again, let's use Copilot to help us with the task.

Just before the `DbService` class definition, remove this comment that we added earlier:

```ts
// Create a DbService class to wrap the Cosmos SDK,
// connecting to the 'todos' database and 'tasks' container
// and with CRUD methods for tasks
```

And instead, start typing `/**` to add a JSDoc comment, and hit enter. Copilot will start suggesting the documentation for the class. You may start tying `This` and hit `Tab` then `Enter` to accept the suggestions as they come, until the documentation is complete. You should end up with something like this:

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

Not bad, right? Wait, it's even mentioning something we forgot: the `DbService` class should be a singleton, as we don't want to create multiple connections to the database. Let's fix that.

This time, we'll try to use some black magic 👀.

Put your cursor at the end of this line in the `DbService` class:

```ts
private container: any;
```

Wow, now it even suggests you the comments! Accept that and continue, until you get what we need. You should end up with something like this:

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

Don't you agree that this looks like black magic? We didn't even tell Copilot what we wanted, and it just gave us the code we needed. How useful is that?

### (Optional) Fix missing types with Copilot Labs

Our database service is now almost perfect, but there's still one thing that bothers me: the types. We're using `any` for the `database` and `container` properties, which is not ideal. We could go back to the Cosmos SDK documentation and try to find the right types, but that would be a lot of work. Let's see if Copilot can help us with that.

In the VS Code toolbar, select the `Copilot Labs` tab:

![Screenshot of Copilot Labs tab in VS Code](./assets/copilot-labs.png)

Select the two problematic lines in your code:

```ts
private database: any;
private container: any;
```

Once they're highlighted, click on the **Add types** button in the **Brushes** panel:

![Screenshot of Copilot Labs brushes panel in VS Code highlighting the "Add Types" button](./assets/copilot-labs-add-types.png)

Copilot will now try to find the right types for your variables. It will take a few seconds, but once it's done, you should see something like this:

```ts
private database: Database;
private container: Container;
```

<div class="info" data-title="note">

> Copilot Labs is still in beta, so it might not work perfectly every time. If it doesn't, you can always use `CTRL+Z` (`CMD+Z` on macOS) to undo the changes, and try again.

</div>

TypeScript is showing us an error now, because we're using the `Database` and `Container` types from the Cosmos SDK, but we didn't import them. Click on the blue lightbulb to open VS Code's quick fixes options, and select **Add all missing imports**:

![Screenshot of VS Code ](./assets/vscode-auto-import.png)

Oh no, once we do that we get new errors! It seems that the return types of the `createTask()` and `updateTask()` methods are wrong. Replace `Promise<Task>` with `Promise<Task | undefined>` for both methods, and you should be good to go.

Thanks for the catch, TypeScript! 🙏

---

## Add unit tests

We now have a working database service, but we don't have any tests for it. We're good developers, so we should always write tests for our code. Let's see how Copilot can help us with that.

First, create a new file `packages/server/src/services/db.spec.ts` and add the following code:

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

<div class="tip" data-title="tip">

> We're using [Jest](https://jestjs.io/) as our test framework. If you're not familiar with it, don't worry, we won't go into too much details here. You can read more about it in the [Jest documentation](https://jestjs.io/docs/getting-started).

</div>

We've prepared a few things here. We're mocking the Cosmos SDK as we don't want to use the real thing, and we're setting the environment variables needed by the `DbService` class. Then we wrote a first test for the `getTasks()` method.

First, let's add a few more tests. Put your cursor at the end of the `describe()` function, and hit `Enter` to create a new test.

![Screenshot of Copilot suggesting a new test](./assets/copilot-test-suggestion.png)

If you continue acceptiong Copilot's suggestions, you should end up with a complete test suite for all the methods of the `DbService` class. Note that sometimes Copilot needs a little help to close the final parentheses for each test! We may sometimes think that it has a mind of its own, just making sure you're paying attention 😉.

<details>
<summary>Example Copilot suggestions</summary>

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

Since we've mocked out the Cosmos SDK completely with `jest.mock()`, all the tests should fail.
Run the following command in a terminal to launch the tests:

```bash
npm test
```

As expected, it fails. But that's a good thing, as good test writing is all about failing tests first!

### Mocking Cosmos SDK methods

To make it work, we need to now properly implement mocks for the Cosmos SDK methods.
Put your cursor at the end of the `beforeAll()` function, and hit `Enter`.

![Screenshot of Copilot suggesting mocking the Cosmos SDK](./assets/copilot-mock-suggestion.png)

Wow, Copilot seems to know what we want to do! Let's accept this comment.
This time, instead of accepting the first suggestion, let's open the **Copilot toolbar** to see all the suggestions and pick the one that looks best to us.

![Screenshot of Copilot toolbar](./assets/copilot-toolbar.png)

A new panel should open on the right side of the screen, where you can scroll through all the suggestions Copilot has for you. Once you've found the one you like, click on **Accept solution** to insert the code and close the panel.

Save the file, and run the tests again. Oh no, 4 of the 5 tests are still failing! Let's see what's going on.

Scroll up to see the first test failure, and you should see that `fetchAll()` is not a function, meaning that it's not mocked properly. Let's fix that.

![Screenshot of jest output showing the first test failure](./assets/jest-test-failure.png)

In the mocked `query()` method, remove this line `resources: []` of its current implementation, and wait for Copilot to suggest something.

![Screenshot of Copilot suggesting a new line of code](./assets/copilot-mock-fix-suggestion.png)

<details>
<summary>Example Copilot suggestion</summary>

```ts
fetchAll: () => ({
  resources: []
})
```

</details>

Yes, that's it, Copilot caught up and is fixing its own mistake!
Let's accept the suggestions until it's complete, and run the tests again. This time, the last 3 tests are failing. Let's see what's going on with the first one.

![Screenshot of jest output showing the second test failure](./assets/jest-test-failure-2.png)

Okay, slight mistake as it seems `container.item` is not mocked properly, and looked at the mocks Copilot generated everything was added to the `items` property, not `item`. Let's fix that.

Below the `items` property closing curly brace, add this code (Copilot might even suggest it for you):

```ts
item: () => ({

}),
```

Then move the `read()`, `upsert()` and `delete()` methods from the `items` block to the `item` block we juste added.

You should end up with something like this:

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

Run the tests again, and... one last failure!

![Screenshot of jest output showing the third test failure](./assets/jest-test-failure-3.png)

That's right, Copilot mocked an `upsert()` method, but not a `replace()` method. Just rename `upsert` to `replace` and this time, all tests should pass!

We've seen in this example that Copilot can help us write tests and mocks, but cannot do it all by itself. It needs some context to be able to suggest the right code, and sometimes we need to help it out a bit.
In the end, we still have our test suite written with very little effort and time!

---

## Update API routes

The database service is complete and fully tested, we can now update our API routes to use it.

Open the file `packages/server/src/routes/index.ts` and take a quick look at it. We've already created all the routes we need, but the implementation is all stubbed and with `TODO` comments all over the place as we didn't have the database service ready yet.

Time to remove all the *TODOs*!

### Import database service

First, we need to import our database service. At the top of the file, add the following line after the other imports:

```ts
import { DbService } from '../services/db';
```

### Remove stubs

#### Get tasks

Then, move on to our first TODO: `// TODO: get tasks from database`
On the line below, replace the right hand side of the assignment with `await DbService.getInstance`. As you type, Copilot should complete the code for you.

![Screenshot of Copilot completing the code](./assets/copilot-dbservice-1.png)

Accept the suggestion, and you're done for the first TODO, you can now remove the comment.

#### Create task

Move on to the next TODO, `// TODO: create task in database`.
On the line below, just type `await` and Copilot should do its magic again:

![Screenshot of Copilot completing the code](./assets/copilot-dbservice-2.png)

Accept the suggestion. But wait, something's missing here, we're not checking that the provided task is valid! Let's make sure the task has a `title` set before we're adding it into the database.

Just before the TODO comment, add the comment `// Check that the task has a title`, hit enter and see what Copilot came up with. Accept the suggestions until it's complete.

<details>
<summary>Example Copilot suggestion</summary>

```ts
// Check that the task has a title
if (!task.title) {
  return res.status(400).json({ error: 'Task title is required' });
}
```

</details>

That's it copilot, just what we needed! We can remove this TODO comment and move on to the next one.

#### Get a single task

The next TODO is `// TODO: get task from database`.
You know what to do now, replace the right hand part of the assignment below with `await` and let Copilot complete that for you.

![Screenshot of Copilot completing the code](./assets/copilot-dbservice-3.png)

Remove the TODO comment, next!

#### Update task

The next TODO is `// TODO: get existing task in database`.
Same as before, replace the right hand part of the assignment below with `await` and let Copilot complete that for you.

![Screenshot of Copilot completing the code](./assets/copilot-dbservice-4.png)

One down, do the same thing again for the next TODO, `// TODO: update task in database`.

![Screenshot of Copilot completing the code](./assets/copilot-dbservice-5.png)

Remove both TODO comments, and we're done with this one.

#### Delete task

Last one, we'll do the same procedure again for the TODO `// TODO: delete task in database`. On the line below the comment, just type `await` and let Copilot complete it for you.

![Screenshot of Copilot completing the code](./assets/copilot-dbservice-6.png)

Remove the final TODO comment, and our API is now complete.
Didn't that feel easy?

### Test the API


---

## Deploy to Azure

Azure is Microsoft's cloud platform. It provides a wide range of services to build, deploy, and manage applications. We'll use a few of them in this workshop to run our application.

First, you need to make sure you have an Azure account. If you don't have one, you can create a free account including Azure credits on the [Azure website](https://azure.microsoft.com/free/).

<!-- <div class="important" data-title="important">

> If you're following this workshop in-person at SnowCamp, you can use the following link to get a 50$ Azure Pass credit: [redeem your Azure Pass](https://azcheck.in/sno230125)

</div> -->

Once you have your Azure account, open a terminal at the root of the project and run:

```bash
.azure/setup.sh
```

This script uses the [Azure CLI](https://learn.microsoft.com/cli/azure) and [GitHub CLI](https://cli.github.com/) to do the following:
- Login into your Azure account
- Select a subscription to use
- Create a [service principal](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal), a token that will be used to create or update resources in Azure
- Login into your GitHub account
- Add the `AZURE_CREDENTIALS` secret to your GitHub repository, with your the service principal token

Before reading further, let's run the script that will create all the Azure resources we'll need for this workshop, as it will take a few minutes to complete (we'll explain what it does a bit later):

```bash
.azure/infra.sh update
```

### Introducing Azure services

Let's look again at our application architecture diagram we saw earlier:

![Application architecture](./assets/architecture.drawio.png)

To run and monitor our application, we'll use various Azure services:

| Service | Description |
| ------- | ----------- |
| [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/) | A managed service to run containers in Azure, with built-in load balancing, auto-scaling, and more. |
| [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/) | A service to host websites, with built-in authentication, serverless API functions or proxy, Edge CDN and more. |
| [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/) | A NoSQL globally distributed database, that supports SQL, MongoDB, Cassandra, Gremlin, and Azure Table storage APIs. |
| [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/) | A container registry to store and manage container images. |
| [Azure Log Analytics](https://learn.microsoft.com/azure/log-analytics/) | A service to collect and analyze logs from your Azure resources. |
| [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) | A service to monitor your Azure resources, with built-in dashboards, alerts, and more. |

Azure Log Analytics doesn't appear in our diagram, but we'll use it to collect logs from our containers and use them to debug our application when needed. Azure Monitor isn't explicitly part of our infrastructure, but it's enabled across all Azure resources, and we'll use it to monitor our application and build a dashboard.

#### About Azure Container Apps

The primary service we'll use is [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/overview), a fully managed serverless container service on Azure. It allows you to run containerized applications without worrying about orchestration or managing complex infrastructure such as Kubernetes.

You write code using your preferred programming language or framework (in this workshop it's JavaScript and Node.js, but it can be anything), and build microservices with full support for [Distributed Application Runtime (Dapr)](https://dapr.io/). Then, your containers will scale dynamically based on HTTP traffic or events powered by [Kubernetes Event-Driven Autoscaling (KEDA)](https://keda.sh).

There are already a few compute resources on Azure: from IAAS to FAAS.
Azure Container Apps sits between PAAS and FAAS.
On one hand, it feels more PaaS, because you are not forced into a specific programming model and you can control the rules on which to scale out / scale in.
On the other hand, it has quite some serverless characteristics like scaling to zero, event-driven scaling, per second pricing and the ability to leverage Dapr's event-based bindings.

![Diagram showing the different compute resources on Azure](./assets/azure-compute-services.png)

Container Apps is built on top of [Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/), including a deep integration with KEDA (event-driven auto scaling for Kubernetes), Dapr (distributed application runtime) and Envoy (a service proxy designed for cloud-native applications).
The underlying complexity is completely abstracted for you.
So, no need to configure your Kubernetes service, ingress, deployment, volume manifests... You get a very simple API and user interface to configure the desired configuration for your containerized application.
This simplification means also less control, hence the difference with AKS.

![Diagram showing the architecture of Azure Container Apps](./assets/azure-container-apps.png)

Azure Container Apps has the following features:
- *Revisions*: automatic versioning that helps to manage the application lifecycle of your container apps
- *Traffic control*: split incoming HTTP traffic across multiple revisions for Blue/Green deployments and A/B testing
- *Ingress*: simple HTTPS ingress configuration, without the need to worry about DNS and certificates
- *Autoscaling*: leverage all KEDA-supported scale triggers to scale your app based on external metrics
- *Secrets*: deploy secrets that are securely shared between containers, scale rules and Dapr sidecars
- *Monitoring*: the standard output and error streams are automatically written to Log Analytics
- *Dapr*: through a simple flag, you can enable native Dapr integration for your Container Apps

Azure Container Apps introduces the following concepts:
- *Environment*: this is a secure boundary around a group of Container Apps.
They are deployed in the same virtual network, these apps can easily intercommunicate easily with each other and they write logs to the same Log Analytics workspace. An environment can be compared with a Kubernetes namespace.

- *Container App*: this is a group of containers (pod) that is deployed and scale together. They share the same disk space and network.

- *Revision*: this is an immutable snapshot of a Container App.
New revisions are automatically created and are valuable for HTTP traffic redirection strategies, such as A/B testing.

![Diagram showing the environment concept in Azure Container Apps](./assets/aca-environment.png)

### Creating the infrastructure

Now that we know what we'll be using, let's create the infrastructure we'll need for this workshop.

You can use different ways to create Azure resources: the Azure CLI, the [Azure Portal](https://portal.azure.com), ARM templates, or even VS Code extensions or third party tools like Terraform.

All these tools have one thing in common: they all use the [Azure Resource Manager (ARM) API](https://docs.microsoft.com/azure/azure-resource-manager/management/overview) to create and manage Azure resources. The Azure CLI is just a wrapper around the ARM API, and the Azure Portal is a web interface to the same API.

![Diagram of how Azure Resource Manager interacts with different tools](./assets/azure-resource-manager.png)

Any resource you create in Azure is part of a **resource group**. A resource group is a logical container that holds related resources for an Azure solution, just like a folder.

When you ran the command `.azure/infra.sh update` earlier, it created a resource group name `rg-node-microservices-prod` with all the infrastructure for you, using Azure CLI and Infrastructure as Code (IaC) templates. We'll look at the details of the scripts later in this section.

### Introducing Infrastructure as Code

Infrastructure as Code (IaC) is a way to manage your infrastructure using the same tools and practices you use for your application code. In other words: you write code to describe the resources you need, and this code is committed to your project repository so you can use it to create, update, and delete your infrastructure as part of your CI/CD pipeline or locally.

It's a great way to ensure consistency and repeatability of your infrastructure, and allows to manage the infrastructure of your project just like you manage the code of your project.

There are many existing tools to manage your infrastructure as code, such as Terraform, Pulumi, or [Azure Resource Manager (ARM) templates](https://learn.microsoft.com/azure/azure-resource-manager/templates/overview). ARM templates are JSON files that allows you to define and configure Azure resources.

In this workshop, we'll use [Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep), a new language that abtracts ARM templates creation while being more concise, readable and easier to use.

#### What's Bicep?

Bicep is a Domain Specific Language (DSL) for deploying Azure resources declaratively. It aims to drastically simplify the authoring experience with a cleaner syntax, improved type safety, and better support for modularity and code re-use. It's a transparent abstraction over ARM templates, which means anything that can be done in an ARM Template can be done in Bicep.

Here's an example of a Bicep file that creates a Log Analytics workspace:

```bicep
resource logsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: 'my-awesome-logs'
  location: 'westeurope'
  tags: {
    environment: 'production'
  }
  properties: {
    retentionInDays: 30
  }
}
```

A resource is made of differents parts. First, you have the `resource` keyword, followed by a symbolic name of the resource that you can use to reference that resource in other parts of the template. Next to it is a string with the resource type you want to create and API version.

<div class="info" data-title="note">

> The API version is important, as it defines the version of the template used for a resource type. Different API versions can have different properties or options, and may introduce breaking changes. By specifying the API version, you ensure that your template will work regardless of the product updates, making your infrastructure more resilient over time.

</div>

Inside the resource, you then specify the name of the resource, its location, and its properties. You can also add tags to your resources, which are key/value pairs that you can use to categorize and filter your resources.

Bicep templates can be split into multiple files, and you can use modules to reuse common parts of your infrastructure. You can also use parameters to make your templates more flexible and reusable.

Have a look at the files inside the folder `./azure/infra` to see how we created the infrastructure for this workshop. The entry point is the `main.bicep` file, which is the main template that use the differents modules located in the `./azure/infra/modules` folder.

Writing templates from scratch can be a bit tedious, but fortunately most of the time you don't have to:
- You can reuse templates for the [Azure Quickstart collection](https://github.com/Azure/azure-quickstart-templates/tree/master/quickstarts)
- The [Bicep VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-bicep) help you write your templates, providing snippets, syntax highlighting, auto-completion, and validation.
- The [Bicep playground](https://aka.ms/bicepdemo) allows you to convert an ARM template to Bicep, and vice versa.

### Details about the `infra.sh` script

Because entering a bunch of commands one after the other in a terminal is not very fun, we made a Bash script to automate all the heavy lifting. This is the `.azure/infra.sh` script we ran earlier.

This script is a wrapper around Azure CLI commands. The `update` command does the following:

1. Run the command `az group create` to create a resource group if it doesn't exist yet.

2. Run the command `az deployment group create` to create or update the resources in the resource group. This command takes a Bicep template as input, and creates or updates the resources defined in the template.

3. Reformat the JSON deployment output from the previous command into the file `.<environment>.env`. You should see the file `.azure/.prod.env` that was created earlier.

4. Run `az` commands specific to the resources created, to retrieve secrets like the connection string for database or the registry credentials, and store them in the `.env` file.

If you're curious, you can have a look at the script to see how it works, and reuse it for your own projects.

---

<div class="info" data-title="skip notice">

> This step is entirely optional, you can skip it if you want to jump directly to the next section. In that case, your services won't persist the data and continue to use the in-memory storage, but you'll still be able to test and deploy the application.

</div>


## Adding CI/CD

Our code and infrastructure are ready, so it's time to deploy our application. We'll use [GitHub Actions](https://github.com/features/actions) to create a CI/CD workflow.

### What's CI/CD?

CI/CD stands for *Continuous Integration and Continuous Deployment*.

Continuous Integration is a software development practice that requires developers to integrate their code into a shared repository several times a day. Each integration can then be verified by an automated build and automated tests. By doing so, you can detect errors quickly, and locate them more easily.

Continuous Deployment pushes this practice further, by preparing for a release to production after each successful build. By doing so, you can get working software into the hands of users faster.

### What's GitHub Actions?

GitHub Actions is a service that lets you automate your software development workflows. A workflow is a series of steps executed one after the other. You can use workflows to build, test and deploy your code, but you can also use them to automate other tasks, like sending a notification when an issue is created.

It's a great way to automate your CI/CD pipelines, and it's free for public repositories.

### Adding a deployment workflow

To set up GitHub Actions for deployment, we'll need to create a new workflow file in our repository.
This file will contain the instructions for our CI/CD pipeline.

Create a new file in your repository with the path `.github/workflows/deploy.yml` and the following content:

```yml
name: Azure deployment
on:
  push:
    branches:
      - main

concurrency:
  group: deployment

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the project
        uses: actions/checkout@v3

      - name: Login to Azure
        run: .azure/setup.sh --ci-login
        env:
          AZURE_CREDENTIALS: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Update infrastructure
        run: .azure/infra.sh update

      - name: Build project
        run: .azure/build.sh

      - name: Deploy project
        run: .azure/deploy.sh
```

Let's take some time to decompose this workflow file.

First, the `on` section defines when the workflow should be triggered. In this case, we want to trigger the workflow when a push is made to the `main` branch. You can trigger workflows on any event happening in your repository, like when an issue is created, or when a pull request is merged.

Then, the `concurrency` section defines how to handle multiple runs of the workflow, for example if multiple commits are pushed and the previous workflow hasn't finished yet. In this case, we'll simply wait for the previous workflow to finish before starting a new one by specifying a unique name. By default, workflows will run in parallel.

In the `jobs` section, we can define one or more jobs to execute. In this case, we only have one job, called `build_and_deploy`. We can specify the platform and operating system to use with the `runs-on` property, in our case we'll use a linux machine with the latest version of Ubuntu. Different platforms are available such as Windows or macOS, and CPU architectures as well like ARM. The default [runner images](https://github.com/actions/runner-images#available-images) provided by GitHub Actions already have many tools pre-installed and will be enough for our needs, but if you need to use a specific setup you can either use a container image or add additional installation steps for the tools you want to use.

Finally, we can define the steps to execute in the job. Each step is a separate action, and we can use the `uses` property to specify a pre-defined action from the [GitHub Marketplace](https://github.com/marketplace?type=actions), or the `run` property to execute a command in the container. In our case, we first checkout the project, then login to Azure, update our infrastructure then build and deploy the project.

Notice that for the login step, we need to provide the `AZURE_CREDENTIALS` secret we created earlier. This secret is exposed to our script as an environment variable, using the `env` property.

But wait, we didn't write the `build.sh` and `deploy.sh` scripts yet!

### Writing the build script

To build our application, we need to do two things:
- Build the Docker image for our 3 microservices
- Build our website

Open the file `.azure/build.sh` and add the following content:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Install dependencies
npm ci

# Build all Docker images
npm run docker:build --if-present --workspaces

# Build the website
npm run build --workspace=website
```

The first line is a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) that tells the shell which program to use to execute the script, here the `bash` program.

The next line `set -euo pipefail` sets [bash options](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html) to exit if any command fails, or if an undefined variable is used. This is a good practice to avoid silent failures in your scripts.

The following line `cd "$(dirname "${BASH_SOURCE[0]}")/.."` changes the current directory to the root of the project. The command `dirname "${BASH_SOURCE[0]}"` gets the folder name of the current script. This is useful to ensure the current working directory is always the root of the project, even if the script is executed from a different folder.

After that, we install the dependencies and build our services and the website. Notice the `--workspaces` option that allows to run this script in every project of our workspace. We also used the `--if-present` option to skip the command if the script doesn't exist, like for the `website` project.

### Writing the deploy script

Next, we'll write the script to deploy our application. Open the file `.azure/deploy.sh` and add the following content:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source .prod.env
cd ..

# Get current commit SHA
commit_sha="$(git rev-parse HEAD)"

# Allow silent installation of Azure CLI extensions
az config set extension.use_dynamic_install=yes_without_prompt

echo "Logging into Docker..."
echo "$REGISTRY_PASSWORD" | docker login \
  --username "$REGISTRY_USERNAME" \
  --password-stdin \
  "$REGISTRY_NAME.azurecr.io"
```

The first part of the script is similar to the build script, we set the bash options and change the current directory, but in addition we source the variables and secrets from the `.prod.env` file so that we can use them in the script.

After that we prepare a few things:
- We get the current commit [SHA](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms), so we can use it to tag our Docker images
- We configure the Azure CLI to allow the silent installation of Azure CLI extensions, like the `containerapp` extension we'll use later

Then we configure Docker to log into our private registry, so we can push our Docker images to it.

Now let's add below the commands to deploy our services:

```bash
echo "Deploying settings-api..."
docker image tag settings-api "$REGISTRY_NAME.azurecr.io/settings-api:$commit_sha"
docker image push "$REGISTRY_SERVER/settings-api:$commit_sha"

az containerapp update \
  --name "${CONTAINER_APP_NAMES[0]}" \
  --resource-group "$RESOURCE_GROUP_NAME" \
  --image "$REGISTRY_SERVER/settings-api:$commit_sha" \
  --set-env-vars \
    DATABASE_CONNECTION_STRING="$DATABASE_CONNECTION_STRING" \
  --query "properties.configuration.ingress.fqdn" \
  --output tsv

echo "Deploying dice-api..."
docker image tag dice-api "$REGISTRY_NAME.azurecr.io/dice-api:$commit_sha"
docker image push "$REGISTRY_SERVER/dice-api:$commit_sha"

az containerapp update \
  --name "${CONTAINER_APP_NAMES[1]}" \
  --resource-group "$RESOURCE_GROUP_NAME" \
  --image "$REGISTRY_SERVER/dice-api:$commit_sha" \
  --set-env-vars \
    DATABASE_CONNECTION_STRING="$DATABASE_CONNECTION_STRING" \
  --query "properties.configuration.ingress.fqdn" \
  --output tsv

echo "Deploying gateway-api..."
docker image tag gateway-api "$REGISTRY_NAME.azurecr.io/gateway-api:$commit_sha"
docker image push "$REGISTRY_SERVER/gateway-api:$commit_sha"

az containerapp update \
  --name "${CONTAINER_APP_NAMES[2]}" \
  --resource-group "$RESOURCE_GROUP_NAME" \
  --image "$REGISTRY_SERVER/gateway-api:$commit_sha" \
  --set-env-vars \
    SETTINGS_API_URL="https://${CONTAINER_APP_HOSTNAMES[0]}" \
    DICE_API_URL="https://${CONTAINER_APP_HOSTNAMES[1]}" \
  --query "properties.configuration.ingress.fqdn" \
  --output tsv
```

We'll do the same thing for our 3 services:
1. We tag the Docker image with the current commit SHA, and push it to our registry
2. We use the Azure CLI to update the container app with the new image, and set the environment variables for each service. For the settings and dice APIs, we set the database connection string, and for the gateway API we set the URLs of the other services.

<div class="tip" data-title="tip">

> The Azure CLI `--query` option allows to get a specific value from JSON response using [JMESPath syntax](https://jmespath.org/), while `--output tsv` sets the output format to a string. Here we use it to get the hostname of the container apps, as it might be helpful to debug the deployment if someone looks at the logs.

</div>

Let's continue with adding the command to deploy our website:

```bash
echo "Deploying website..."
cd packages/website
npx swa deploy \
  --app-name "${STATIC_WEB_APP_NAMES[0]}" \
  --deployment-token "${STATIC_WEB_APP_DEPLOYMENT_TOKENS[0]}" \
  --env "production" \
  --verbose
```

We use the Static Web Apps CLI this time deploy our website. Because it's installed locally in the `website` project, we need to invoke it with `npx`.

### Deploying the application

The workflow and scripts are complete, so it's time let the CI/CD pipeline do its job.

Commit all the changes you made to the repository, and push them, using either VS Code or the command line:

```bash
git add .
git commit -m "Setup CI/CD"
git push
```

The workflow will run automatically, so we can look at its progress directly on GitHub. Open your repository in a browser with this command:

```bash
gh repo view -w
```

Select the **Actions** tab, and you should see the workflow running. It will take a few minutes to complete, but you can follow the progress in the logs by clicking on the running workflow.

![Screenshot showing GitHub Actions workflow running](./assets/gh-actions.png)

Then select the job name **build_and_deploy** on the left, and you should see the logs of the workflow.

![Screenshot showing GitHub Actions workflow logs](./assets/gh-workflow-details.png)

When the workflow is complete, you should see a green checkmark.

### Testing the application

After your deployment is complete, you can finally test the application by opening the URL of the Static Web App in a browser. You can find the URL in the workflow logs, or using these commands:

```bash
source .azure/.prod.env 
open "https://$STATIC_WEB_APP_HOSTNAMES"
```

You should then see the website. Log in with your GitHub account, and you should be able to roll some dice!

![Screenshot showing the deployed website](./assets/app-deployed.png)

---

## Conclusion

That's it, the end of the workshop. As advertised, we *did* pair program with Copilot, but let's be honest, sometimes we felt more as the assitant as Copilot did most of the hard work for use. Like in any pair programming session, we still had to check what Copilot was doing, and guide it to the right direction. But overall, in a matter of minutes we were able to complete and deploy our application with minimal effort.

We hope you enjoyed following along, learned something new and more importantly, that you'll be able to take this experience back to your projects.

<div class="warning" data-title="had issues?">

> If you experienced any issues during the workshop, please let us know by [creating an issue](https://github.com/Azure-Samples/copilot-nodejs-todo/issues) on the GitHub repository.

</div>

### Cleaning up Azure resources

<div class="important" data-title="important">

> Don't forget to delete the Azure resources once you are done running the workshop, to avoid incurring unnecessary costs!

</div>

To delete the Azure resources, you can run this command:

```bash
.azure/infra.sh delete
```

Or directly use the Azure CLI:

```bash
az group delete --name rg-copilot-nodejs-todo-prod
```

### References

- This workshop URL: [aka.ms/ws/copilot-todo](https://aka.ms/ws/copilot-todo)
- The source repository for this workshop: [GitHub link](https://github.com/Azure-Samples/copilot-nodejs-todo)
- The base template for this workshop: [GitHub link](https://github.com/Azure-Samples/copilot-nodejs-todo-template)
- If something does not work: [Report an issue](https://github.com/Azure-Samples/copilot-nodejs-todo/issues)
