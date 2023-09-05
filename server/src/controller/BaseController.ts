// src/controller/BaseController.ts
import { Request, Response, Router } from "express";
import { BaseService } from "../service/BaseService";
import { ObjectLiteral } from "typeorm";

export abstract class BaseController<T extends ObjectLiteral> {
  router: Router;
  protected abstract entityName: string;

  constructor(private _baseService: BaseService<T>) {
    this.router = Router();
    this.routes();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const entities = await this._baseService.getAll();
      return res.json(entities);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const entity = await this._baseService.get(Number(req.params.id));
      return res.json(entity);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const newEntity = await this._baseService.create(req.body);
      return res.status(201).json(newEntity);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatedEntity = await this._baseService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(200).json(updatedEntity);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this._baseService.delete(Number(req.params.id));
      return res
        .status(200)
        .json({ message: `${this.entityName} deleted successfully.` });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  routes(): void {
    this.router.get("/", this.getAll.bind(this));
    this.router.get("/:id", this.get.bind(this));
    this.router.post("/", this.create.bind(this));
    this.router.put("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}
