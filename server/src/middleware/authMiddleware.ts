// server/src/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// Extend Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "NO_JWT_KEY",
    (err, decoded: any) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to authenticate token" });
      }

      // assert decoded as DecodedToken and then use it
      const decodedToken = decoded as DecodedToken;
      req.userId = Number(decodedToken.id);
      next();
    }
  );
};
