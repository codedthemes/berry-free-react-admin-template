// server/src/controller/UserController.ts
import { User } from "../entity/User";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { TokenService } from "../service/TokenService";
import { EntityManager } from "typeorm";
import { validationResult } from "express-validator";

export class UserController extends BaseController<User> {
  protected entityName = "User";
  private userService: UserService;
  private tokenService: TokenService;

  constructor(userService: UserService) {
    super(userService);
    this.userService = userService;
    this.tokenService = new TokenService();

    // Bind 'this' context for methods
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  public async register(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, email, password } = req.body;

    const newUser = new User();
    newUser.firstName = fname;
    newUser.lastName = lname;
    newUser.email = email;
    newUser.password = await this.userService.hashPassword(password);

    const savedUser = await this.userService.save(newUser);

    return res.status(201).json(newUser);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If user is found and password is correct, generate a token
    const token = this.tokenService.generateToken({ userId: user.id });

    return res.status(200).json({ user, token });
  }
}
