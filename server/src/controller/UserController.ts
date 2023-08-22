// server/src/controller/UserController.ts
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { EntityManager } from "typeorm";

export class UserController extends BaseController<User> {
  protected entityName = "User";
  private userService: UserService;

  constructor(entityManager: EntityManager) {
    const userService = new UserService(entityManager);
    super(userService);
    this.userService = userService;
  }

  public async customUserEndpoint(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Custom logic specific to users
    return res.status(200).json({ message: "Custom user endpoint." });
  }

  // Use this.userService to access the methods from UserService
}
