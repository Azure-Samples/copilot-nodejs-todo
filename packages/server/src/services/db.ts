// Import Cosmos SDK
import { CosmosClient } from "@azure/cosmos";

/**
 * This class is responsible for connecting to Cosmos DB and
 * performing CRUD operations on the database and container.
 * It is a singleton class, so only one instance of it will
 * exist at any given time.
 * @class
 * @property {CosmosClient} client - The CosmosClient instance
 * @property {any} database - The database instance
 * @property {any} container - The container instance
 * @method getTasks - Get all tasks
 * @method getTask - Get a task by id
 * @method createTask - Create a task
 * @method updateTask - Update a task
 * @method deleteTask - Delete a task
 * @returns {DbService} - The DbService instance
 */
export class DbService {
  private client: CosmosClient;
  private database: any;
  private container: any;

  // Create a static instance of the class
  private static instance: DbService;

  // Create a static method to get the instance
  public static getInstance() {
    if (!DbService.instance) {
      DbService.instance = new DbService();
    }

    return DbService.instance;
  }

  constructor() {
    // Check that the environment variables are set
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
