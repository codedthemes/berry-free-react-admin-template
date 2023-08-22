import { ObjectLiteral } from "../common/ObjectLiteral";
import { Repository } from "./Repository";
import { MongoFindManyOptions } from "../find-options/mongodb/MongoFindManyOptions";
import { MongoEntityManager } from "../entity-manager/MongoEntityManager";
import { QueryRunner } from "../query-runner/QueryRunner";
import { SelectQueryBuilder } from "../query-builder/SelectQueryBuilder";
import { MongoFindOneOptions } from "../find-options/mongodb/MongoFindOneOptions";
import { FindOneOptions } from "../find-options/FindOneOptions";
import { CreateIndexesOptions, ObjectId, ReplaceOptions, AggregateOptions, AggregationCursor, AnyBulkWriteOperation, BulkWriteOptions, BulkWriteResult, Collection, CollStats, CollStatsOptions, CommandOperationOptions, CountOptions, DeleteOptions, DeleteResult, Document, Filter, FilterOperators, FindCursor, FindOneAndDeleteOptions, FindOneAndReplaceOptions, FindOneAndUpdateOptions, IndexDescription, InsertManyResult, InsertOneOptions, InsertOneResult, ListIndexesCursor, ListIndexesOptions, OrderedBulkOperation, UnorderedBulkOperation, UpdateFilter, UpdateOptions, UpdateResult } from "../driver/mongodb/typings";
import { FindManyOptions } from "../find-options/FindManyOptions";
/**
 * Repository used to manage mongodb documents of a single entity type.
 */
export declare class MongoRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
    /**
     * Entity Manager used by this repository.
     */
    readonly manager: MongoEntityManager;
    /**
     * Raw SQL query execution is not supported by MongoDB.
     * Calling this method will return an error.
     */
    query(query: string, parameters?: any[]): Promise<any>;
    /**
     * Using Query Builder with MongoDB is not supported yet.
     * Calling this method will return an error.
     */
    createQueryBuilder(alias: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity>;
    /**
     * Finds entities that match given find options or conditions.
     */
    find(options?: FindManyOptions<Entity> | Partial<Entity> | FilterOperators<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given find options or conditions.
     */
    findBy(where: any): Promise<Entity[]>;
    /**
     * Finds entities that match given find options or conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount(options?: MongoFindManyOptions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given find options or conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCountBy(where: any): Promise<[Entity[], number]>;
    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     *
     * @deprecated use `findBy` method instead in conjunction with `In` operator, for example:
     *
     * .findBy({
     *     id: In([1, 2, 3])
     * })
     */
    findByIds(ids: any[], options?: any): Promise<Entity[]>;
    /**
     * Finds first entity that matches given find options.
     */
    findOne(options: MongoFindOneOptions<Entity>): Promise<Entity | null>;
    /**
     * Finds first entity that matches given WHERE conditions.
     */
    findOneBy(where: any): Promise<Entity | null>;
    /**
     * Finds entity that matches given id.
     *
     * @deprecated use `findOneBy` method instead in conjunction with `In` operator, for example:
     *
     * .findOneBy({
     *     id: 1 // where "id" is your primary column name
     * })
     */
    findOneById(id: string | number | Date | ObjectId): Promise<Entity | null>;
    /**
     * Finds first entity by a given find options.
     * If entity was not found in the database - rejects with error.
     */
    findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity>;
    /**
     * Finds first entity that matches given where condition.
     * If entity was not found in the database - rejects with error.
     */
    findOneByOrFail(where: any): Promise<Entity>;
    /**
     * Creates a cursor for a query that can be used to iterate over results from MongoDB.
     */
    createCursor<T = any>(query?: Filter<Entity>): FindCursor<T>;
    /**
     * Creates a cursor for a query that can be used to iterate over results from MongoDB.
     * This returns modified version of cursor that transforms each result into Entity model.
     */
    createEntityCursor(query?: Filter<Entity>): FindCursor<Entity>;
    /**
     * Execute an aggregation framework pipeline against the collection.
     */
    aggregate<R = any>(pipeline: ObjectLiteral[], options?: AggregateOptions): AggregationCursor<Entity>;
    /**
     * Execute an aggregation framework pipeline against the collection.
     * This returns modified version of cursor that transforms each result into Entity model.
     */
    aggregateEntity(pipeline: ObjectLiteral[], options?: AggregateOptions): AggregationCursor<Entity>;
    /**
     * Perform a bulkWrite operation without a fluent API.
     */
    bulkWrite(operations: AnyBulkWriteOperation[], options?: BulkWriteOptions): Promise<BulkWriteResult>;
    /**
     * Count number of matching documents in the db to a query.
     */
    count(query?: ObjectLiteral, options?: CountOptions): Promise<number>;
    /**
     * Count number of matching documents in the db to a query.
     */
    countBy(query?: ObjectLiteral, options?: CountOptions): Promise<number>;
    /**
     * Creates an index on the db and collection.
     */
    createCollectionIndex(fieldOrSpec: string | any, options?: CreateIndexesOptions): Promise<string>;
    /**
     * Creates multiple indexes in the collection, this method is only supported for MongoDB 2.6 or higher.
     * Earlier version of MongoDB will throw a command not supported error.
     * Index specifications are defined at http://docs.mongodb.org/manual/reference/command/createIndexes/.
     */
    createCollectionIndexes(indexSpecs: IndexDescription[]): Promise<string[]>;
    /**
     * Delete multiple documents on MongoDB.
     */
    deleteMany(query: ObjectLiteral, options?: DeleteOptions): Promise<DeleteResult>;
    /**
     * Delete a document on MongoDB.
     */
    deleteOne(query: ObjectLiteral, options?: DeleteOptions): Promise<DeleteResult>;
    /**
     * The distinct command returns returns a list of distinct values for the given key across a collection.
     */
    distinct(key: string, query: ObjectLiteral, options?: CommandOperationOptions): Promise<any>;
    /**
     * Drops an index from this collection.
     */
    dropCollectionIndex(indexName: string, options?: CommandOperationOptions): Promise<any>;
    /**
     * Drops all indexes from the collection.
     */
    dropCollectionIndexes(): Promise<any>;
    /**
     * Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndDelete(query: ObjectLiteral, options?: FindOneAndDeleteOptions): Promise<Document>;
    /**
     * Find a document and replace it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndReplace(query: ObjectLiteral, replacement: Object, options?: FindOneAndReplaceOptions): Promise<Document>;
    /**
     * Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndUpdate(query: ObjectLiteral, update: Object, options?: FindOneAndUpdateOptions): Promise<Document>;
    /**
     * Retrieve all the indexes on the collection.
     */
    collectionIndexes(): Promise<any>;
    /**
     * Retrieve all the indexes on the collection.
     */
    collectionIndexExists(indexes: string | string[]): Promise<boolean>;
    /**
     * Retrieves this collections index info.
     */
    collectionIndexInformation(options?: {
        full: boolean;
    }): Promise<any>;
    /**
     * Initiate an In order bulk write operation, operations will be serially executed in the order they are added, creating a new operation for each switch in types.
     */
    initializeOrderedBulkOp(options?: BulkWriteOptions): OrderedBulkOperation;
    /**
     * Initiate a Out of order batch write operation. All operations will be buffered into insert/update/remove commands executed out of order.
     */
    initializeUnorderedBulkOp(options?: BulkWriteOptions): UnorderedBulkOperation;
    /**
     * Inserts an array of documents into MongoDB.
     */
    insertMany(docs: ObjectLiteral[], options?: BulkWriteOptions): Promise<InsertManyResult<Document>>;
    /**
     * Inserts a single document into MongoDB.
     */
    insertOne(doc: ObjectLiteral, options?: InsertOneOptions): Promise<InsertOneResult>;
    /**
     * Returns if the collection is a capped collection.
     */
    isCapped(): Promise<any>;
    /**
     * Get the list of all indexes information for the collection.
     */
    listCollectionIndexes(options?: ListIndexesOptions): ListIndexesCursor;
    /**
     * Reindex all indexes on the collection Warning: reIndex is a blocking operation (indexes are rebuilt in the foreground) and will be slow for large collections.
     */
    rename(newName: string, options?: {
        dropTarget?: boolean;
    }): Promise<Collection<Document>>;
    /**
     * Replace a document on MongoDB.
     */
    replaceOne(query: ObjectLiteral, doc: ObjectLiteral, options?: ReplaceOptions): Promise<Document | UpdateResult>;
    /**
     * Get all the collection statistics.
     */
    stats(options?: CollStatsOptions): Promise<CollStats>;
    /**
     * Update multiple documents on MongoDB.
     */
    updateMany(query: ObjectLiteral, update: UpdateFilter<Document>, options?: UpdateOptions): Promise<Document | UpdateResult>;
    /**
     * Update a single document on MongoDB.
     */
    updateOne(query: ObjectLiteral, update: UpdateFilter<Document>, options?: UpdateOptions): Promise<Document | UpdateResult>;
}
