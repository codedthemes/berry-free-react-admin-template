// server/src/service/TokenService.ts
import jwt from "jsonwebtoken";

export class TokenService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || "your-secret-key";
  }

  generateToken(payload: object, expiresIn: string | number = "1h"): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }
}
