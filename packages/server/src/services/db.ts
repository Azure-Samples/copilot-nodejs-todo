// Import Cosmos SDK
import { CosmosClient } from "@azure/cosmos";

// Create a DbService class to wrap the Cosmos SDK,
// connecting to the 'todos' database and 'tasks' container
export class DbService {
  private client: CosmosClient;
  private database: any;
  private container: any;

  constructor() {
    // check that the environment variables are set
    if (!process.env.COSMOS_ENDPOINT) {
      throw new Error("COSMOS_ENDPOINT is not set");
    }
    if (!process.env.COSMOS_KEY) {
      throw new Error("COSMOS_KEY is not set");
    }


    // Connect to Cosmos DB
    this.client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
    });

    // Create a database
    this.database = this.client.database("todos");

    // Create a container
    this.container = this.database.container("tasks");
  }

  // Create a function to get all tasks
  async getTasks() {
    const { resources: tasks } = await this.container.items
      .query({
        query: "SELECT * from c",
      })
      .fetchAll();

    return tasks;
  }

  // Create a function to get a task by id
  async getTask(id: string) {
    const { resource: task } = await this.container.item(id).read();

    return task;
  }

  // Create a function to create a task
  async createTask(task: any) {
    const { resource: createdTask } = await this.container.items.create(task);

    return createdTask;
  }

  // Create a function to update a task
  async updateTask(id: string, task: any) {
    const { resource: updatedTask } = await this.container
      .item(id)
      .replace(task);

    return updatedTask;
  }

  // Create a function to delete a task
  async deleteTask(id: string) {
    const { resource: deletedTask } = await this.container.item(id).delete();

    return deletedTask;
  }
}
