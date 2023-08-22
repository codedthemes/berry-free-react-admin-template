import express, { Application, Request, Response } from "express";
import { UserController } from "./controller/UserController";
import { BaseService } from "./service/BaseService";
import { DataSource, EntityManager } from "typeorm";
class App {
  public app: Application;
  public userController: UserController;
  public entityManager: EntityManager;

  constructor() {
    this.app = express();
    const myDataSource = new DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "testuser",
      password: "password",
      database: "test",
      entities: ["src/entity/*.js"],
      logging: true,
      synchronize: true,
    });

    // establish database connection
    myDataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err);
      });

    this.entityManager = myDataSource.createEntityManager();
    this.userController = new UserController(this.entityManager);
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // User routes
    this.app.post("/users", this.userController.create);
    this.app.get("/users", this.userController.findAll);
    this.app.get("/users/:id", this.userController.findOne);
    this.app.put("/users/:id", this.userController.update);
    this.app.delete("/users/:id", this.userController.delete);

    // Custom User Endpoint
    this.app.get("/users/custom", this.userController.customUserEndpoint);

    // Catch-all for undefined routes
    this.app.all("*", (req: Request, res: Response) => {
      res.status(404).send("Route not found");
    });
  }
}

export default App;
