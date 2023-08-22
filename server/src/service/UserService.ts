// server/src/service/UserService.ts
import { User } from "../entity/User";
import { BaseService } from "./BaseService";
import { EntityManager } from "typeorm";

export class UserService extends BaseService<User> {
  constructor(entityManager: EntityManager) {
    super(User, entityManager);
  }

  // Add any custom methods specific to User here
}
