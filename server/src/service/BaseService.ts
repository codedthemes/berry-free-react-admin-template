// src/service/BaseService.ts
import {
  Repository,
  SelectQueryBuilder,
  EntityTarget,
  EntityManager,
  ObjectLiteral,
} from "typeorm";

export abstract class BaseService<T extends ObjectLiteral> {
  constructor(
    private _entity: EntityTarget<T>,
    private _entityManager: EntityManager
  ) {}

  private get repository(): Repository<T> {
    return this._entityManager.getRepository(this._entity);
  }

  async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async get(id: any): Promise<T | null> {
    return await this.repository.findOne(id);
  }

  async save(record: T): Promise<T | null> {
    const pk = record["id"];

    if (pk === undefined || pk === null) {
      return await this.create(record);
    }

    return await this.update(pk, record);
  }

  async create(entity: T): Promise<T> {
    await this.prePost(entity);
    const result = await this.repository.save(entity);
    await this.afterPost(result);
    return result;
  }

  async update(id: number, entity: T): Promise<T | null> {
    await this.prePut(id, entity);
    await this.repository.update(id, entity);
    const result = await this.get(id);
    if (result === null) {
      throw new Error("Entity not found");
    }
    await this.afterPut(result);
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.preDelete(id);
    await this.repository.delete(id);
    await this.afterDelete(id);
  }

  protected async prePost(entity: T): Promise<void> {}
  protected async afterPost(entity: T): Promise<void> {}

  protected async prePut(id: number, entity: T): Promise<void> {}
  protected async afterPut(entity: T): Promise<void> {}

  protected async preDelete(id: number): Promise<void> {}
  protected async afterDelete(id: number): Promise<void> {}
}
