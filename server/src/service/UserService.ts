// server/src/service/UserService.ts
import { BaseService } from "./BaseService";
import { User } from "../entity/User";
import { EntityManager } from "typeorm";
import bcrypt from "bcrypt";

export class UserService extends BaseService<User> {
  constructor(private entityManager: EntityManager) {
    super(User, entityManager);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    // Find user by email
    const user = await this.entityManager.findOne(User, { where: { email } });

    if (!user) {
      // User not found
      return null;
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwords do not match
      return null;
    }

    // User found and password match
    return user;
  }
}
