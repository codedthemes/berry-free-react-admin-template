import { EntityManager } from "./EntityManager";
import { EntityTarget } from "../common/EntityTarget";
import { ObjectLiteral } from "../common/ObjectLiteral";
import { MongoQueryRunner } from "../driver/mongodb/MongoQueryRunner";
import { FindManyOptions } from "../find-options/FindManyOptions";
import { QueryDeepPartialEntity } from "../query-builder/QueryPartialEntity";
import { InsertResult } from "../query-builder/result/InsertResult";
import { UpdateResult } from "../query-builder/result/UpdateResult";
import { DeleteResult } from "../query-builder/result/DeleteResult";
import { EntityMetadata } from "../metadata/EntityMetadata";
import { BulkWriteResult, AggregationCursor, Collection, FindCursor, Document, AggregateOptions, AnyBulkWriteOperation, BulkWriteOptions, Filter, CountOptions, IndexSpecification, CreateIndexesOptions, IndexDescription, DeleteResult as DeleteResultMongoDb, DeleteOptions, CommandOperationOptions, FindOneAndDeleteOptions, FindOneAndReplaceOptions, UpdateFilter, FindOneAndUpdateOptions, RenameOptions, ReplaceOptions, UpdateResult as UpdateResultMongoDb, CollStats, CollStatsOptions, ChangeStreamOptions, ChangeStream, UpdateOptions, ListIndexesOptions, ListIndexesCursor, OptionalId, InsertOneOptions, InsertOneResult, InsertManyResult, UnorderedBulkOperation, OrderedBulkOperation, IndexInformationOptions, ObjectId, FilterOperators } from "../driver/mongodb/typings";
import { DataSource } from "../data-source/DataSource";
import { MongoFindManyOptions } from "../find-options/mongodb/MongoFindManyOptions";
import { MongoFindOneOptions } from "../find-options/mongodb/MongoFindOneOptions";
import { FindOptionsSelect, FindOptionsSelectByString } from "../find-options/FindOptionsSelect";
import { ColumnMetadata } from "../metadata/ColumnMetadata";
/**
 * Entity manager supposed to work with any entity, automatically find its repository and call its methods,
 * whatever entity type are you passing.
 *
 * This implementation is used for MongoDB driver which has some specifics in its EntityManager.
 */
export declare class MongoEntityManager extends EntityManager {
    readonly "@instanceof": symbol;
    get mongoQueryRunner(): MongoQueryRunner;
    constructor(connection: DataSource);
    /**
     * Finds entities that match given find options.
     */
    /**
     * Finds entities that match given find options or conditions.
     */
    find<Entity>(entityClassOrName: EntityTarget<Entity>, optionsOrConditions?: FindManyOptions<Entity> | Partial<Entity> | FilterOperators<Entity>): Promise<Entity[]>;
    /**
     * Finds entities that match given find options or conditions.
     * Also counts all entities that match given conditions,
     * but ignores pagination settings (from and take options).
     */
    findAndCount<Entity>(entityClassOrName: EntityTarget<Entity>, options?: MongoFindManyOptions<Entity>): Promise<[Entity[], number]>;
    /**
     * Finds entities that match given where conditions.
     */
    findAndCountBy<Entity>(entityClassOrName: EntityTarget<Entity>, where: any): Promise<[Entity[], number]>;
    /**
     * Finds entities by ids.
     * Optionally find options can be applied.
     *
     * @deprecated use `findBy` method instead.
     */
    findByIds<Entity>(entityClassOrName: EntityTarget<Entity>, ids: any[], optionsOrConditions?: FindManyOptions<Entity> | Partial<Entity>): Promise<Entity[]>;
    /**
     * Finds first entity that matches given conditions and/or find options.
     */
    findOne<Entity>(entityClassOrName: EntityTarget<Entity>, options: MongoFindOneOptions<Entity>): Promise<Entity | null>;
    /**
     * Finds first entity that matches given WHERE conditions.
     */
    findOneBy<Entity>(entityClassOrName: EntityTarget<Entity>, where: any): Promise<Entity | null>;
    /**
     * Finds entity that matches given id.
     *
     * @deprecated use `findOneBy` method instead in conjunction with `In` operator, for example:
     *
     * .findOneBy({
     *     id: 1 // where "id" is your primary column name
     * })
     */
    findOneById<Entity>(entityClassOrName: EntityTarget<Entity>, id: string | number | Date | ObjectId): Promise<Entity | null>;
    /**
     * Inserts a given entity into the database.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient INSERT query.
     * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
     * You can execute bulk inserts using this method.
     */
    insert<Entity>(target: EntityTarget<Entity>, entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]): Promise<InsertResult>;
    /**
     * Updates entity partially. Entity can be found by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient UPDATE query.
     * Does not check if entity exist in the database.
     */
    update<Entity>(target: EntityTarget<Entity>, criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | ObjectLiteral, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult>;
    /**
     * Deletes entities by a given conditions.
     * Unlike save method executes a primitive operation without cascades, relations and other operations included.
     * Executes fast and efficient DELETE query.
     * Does not check if entity exist in the database.
     */
    delete<Entity>(target: EntityTarget<Entity>, criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | ObjectLiteral[]): Promise<DeleteResult>;
    /**
     * Creates a cursor for a query that can be used to iterate over results from MongoDB.
     */
    createCursor<Entity, T = any>(entityClassOrName: EntityTarget<Entity>, query?: ObjectLiteral): FindCursor<T>;
    /**
     * Creates a cursor for a query that can be used to iterate over results from MongoDB.
     * This returns modified version of cursor that transforms each result into Entity model.
     */
    createEntityCursor<Entity>(entityClassOrName: EntityTarget<Entity>, query?: ObjectLiteral): FindCursor<Entity>;
    /**
     * Execute an aggregation framework pipeline against the collection.
     */
    aggregate<Entity, R = any>(entityClassOrName: EntityTarget<Entity>, pipeline: Document[], options?: AggregateOptions): AggregationCursor<R>;
    /**
     * Execute an aggregation framework pipeline against the collection.
     * This returns modified version of cursor that transforms each result into Entity model.
     */
    aggregateEntity<Entity>(entityClassOrName: EntityTarget<Entity>, pipeline: Document[], options?: AggregateOptions): AggregationCursor<Entity>;
    /**
     * Perform a bulkWrite operation without a fluent API.
     */
    bulkWrite<Entity>(entityClassOrName: EntityTarget<Entity>, operations: AnyBulkWriteOperation<Document>[], options?: BulkWriteOptions): Promise<BulkWriteResult>;
    /**
     * Count number of matching documents in the db to a query.
     */
    count<Entity>(entityClassOrName: EntityTarget<Entity>, query?: Filter<Document>, options?: CountOptions): Promise<number>;
    /**
     * Count number of matching documents in the db to a query.
     */
    countBy<Entity>(entityClassOrName: EntityTarget<Entity>, query?: ObjectLiteral, options?: CountOptions): Promise<number>;
    /**
     * Creates an index on the db and collection.
     */
    createCollectionIndex<Entity>(entityClassOrName: EntityTarget<Entity>, fieldOrSpec: IndexSpecification, options?: CreateIndexesOptions): Promise<string>;
    /**
     * Creates multiple indexes in the collection, this method is only supported for MongoDB 2.6 or higher.
     * Earlier version of MongoDB will throw a command not supported error.
     * Index specifications are defined at http://docs.mongodb.org/manual/reference/command/createIndexes/.
     */
    createCollectionIndexes<Entity>(entityClassOrName: EntityTarget<Entity>, indexSpecs: IndexDescription[]): Promise<string[]>;
    /**
     * Delete multiple documents on MongoDB.
     */
    deleteMany<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, options?: DeleteOptions): Promise<DeleteResultMongoDb>;
    /**
     * Delete a document on MongoDB.
     */
    deleteOne<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, options?: DeleteOptions): Promise<DeleteResultMongoDb>;
    /**
     * The distinct command returns returns a list of distinct values for the given key across a collection.
     */
    distinct<Entity>(entityClassOrName: EntityTarget<Entity>, key: string, query: Filter<Document>, options?: CommandOperationOptions): Promise<any>;
    /**
     * Drops an index from this collection.
     */
    dropCollectionIndex<Entity>(entityClassOrName: EntityTarget<Entity>, indexName: string, options?: CommandOperationOptions): Promise<any>;
    /**
     * Drops all indexes from the collection.
     */
    dropCollectionIndexes<Entity>(entityClassOrName: EntityTarget<Entity>): Promise<any>;
    /**
     * Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndDelete<Entity>(entityClassOrName: EntityTarget<Entity>, query: ObjectLiteral, options?: FindOneAndDeleteOptions): Promise<Document>;
    /**
     * Find a document and replace it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndReplace<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, replacement: Document, options?: FindOneAndReplaceOptions): Promise<Document>;
    /**
     * Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndUpdate<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, update: UpdateFilter<Document>, options?: FindOneAndUpdateOptions): Promise<Document>;
    /**
     * Retrieve all the indexes on the collection.
     */
    collectionIndexes<Entity>(entityClassOrName: EntityTarget<Entity>): Promise<Document>;
    /**
     * Retrieve all the indexes on the collection.
     */
    collectionIndexExists<Entity>(entityClassOrName: EntityTarget<Entity>, indexes: string | string[]): Promise<boolean>;
    /**
     * Retrieves this collections index info.
     */
    collectionIndexInformation<Entity>(entityClassOrName: EntityTarget<Entity>, options?: IndexInformationOptions): Promise<any>;
    /**
     * Initiate an In order bulk write operation, operations will be serially executed in the order they are added, creating a new operation for each switch in types.
     */
    initializeOrderedBulkOp<Entity>(entityClassOrName: EntityTarget<Entity>, options?: BulkWriteOptions): OrderedBulkOperation;
    /**
     * Initiate a Out of order batch write operation. All operations will be buffered into insert/update/remove commands executed out of order.
     */
    initializeUnorderedBulkOp<Entity>(entityClassOrName: EntityTarget<Entity>, options?: BulkWriteOptions): UnorderedBulkOperation;
    /**
     * Inserts an array of documents into MongoDB.
     */
    insertMany<Entity>(entityClassOrName: EntityTarget<Entity>, docs: OptionalId<Document>[], options?: BulkWriteOptions): Promise<InsertManyResult>;
    /**
     * Inserts a single document into MongoDB.
     */
    insertOne<Entity>(entityClassOrName: EntityTarget<Entity>, doc: OptionalId<Document>, options?: InsertOneOptions): Promise<InsertOneResult>;
    /**
     * Returns if the collection is a capped collection.
     */
    isCapped<Entity>(entityClassOrName: EntityTarget<Entity>): Promise<any>;
    /**
     * Get the list of all indexes information for the collection.
     */
    listCollectionIndexes<Entity>(entityClassOrName: EntityTarget<Entity>, options?: ListIndexesOptions): ListIndexesCursor;
    /**
     * Reindex all indexes on the collection Warning: reIndex is a blocking operation (indexes are rebuilt in the foreground) and will be slow for large collections.
     */
    rename<Entity>(entityClassOrName: EntityTarget<Entity>, newName: string, options?: RenameOptions): Promise<Collection<Document>>;
    /**
     * Replace a document on MongoDB.
     */
    replaceOne<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, doc: Document, options?: ReplaceOptions): Promise<Document | UpdateResultMongoDb>;
    /**
     * Get all the collection statistics.
     */
    stats<Entity>(entityClassOrName: EntityTarget<Entity>, options?: CollStatsOptions): Promise<CollStats>;
    watch<Entity>(entityClassOrName: EntityTarget<Entity>, pipeline?: Document[], options?: ChangeStreamOptions): ChangeStream;
    /**
     * Update multiple documents on MongoDB.
     */
    updateMany<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, update: UpdateFilter<Document>, options?: UpdateOptions): Promise<Document | UpdateResultMongoDb>;
    /**
     * Update a single document on MongoDB.
     */
    updateOne<Entity>(entityClassOrName: EntityTarget<Entity>, query: Filter<Document>, update: UpdateFilter<Document>, options?: UpdateOptions): Promise<Document | UpdateResultMongoDb>;
    /**
     * Converts FindManyOptions to mongodb query.
     */
    protected convertFindManyOptionsOrConditionsToMongodbQuery<Entity>(optionsOrConditions: MongoFindManyOptions<Entity> | Partial<Entity> | FilterOperators<Entity> | any[] | undefined): ObjectLiteral | undefined;
    /**
     * Converts FindOneOptions to mongodb query.
     */
    protected convertFindOneOptionsOrConditionsToMongodbQuery<Entity>(optionsOrConditions: MongoFindOneOptions<Entity> | Partial<Entity> | undefined): ObjectLiteral | undefined;
    /**
     * Converts FindOptions into mongodb order by criteria.
     */
    protected convertFindOptionsOrderToOrderCriteria(order: ObjectLiteral): ObjectLiteral;
    /**
     * Converts FindOptions into mongodb select by criteria.
     */
    protected convertFindOptionsSelectToProjectCriteria(selects: FindOptionsSelect<any> | FindOptionsSelectByString<any>): any;
    /**
     * Ensures given id is an id for query.
     */
    protected convertMixedCriteria(metadata: EntityMetadata, idMap: any): ObjectLiteral;
    /**
     * Overrides cursor's toArray and next methods to convert results to entity automatically.
     */
    protected applyEntityTransformationToCursor<Entity extends ObjectLiteral>(metadata: EntityMetadata, cursor: FindCursor<Entity> | AggregationCursor<Entity>): void;
    protected filterSoftDeleted<Entity>(cursor: FindCursor<Entity>, deleteDateColumn: ColumnMetadata, query?: ObjectLiteral): void;
    /**
     * Finds first entity that matches given conditions and/or find options.
     */
    protected executeFindOne<Entity>(entityClassOrName: EntityTarget<Entity>, optionsOrConditions?: any, maybeOptions?: MongoFindOneOptions<Entity>): Promise<Entity | null>;
    protected executeFind<Entity>(entityClassOrName: EntityTarget<Entity>, optionsOrConditions?: MongoFindManyOptions<Entity> | Partial<Entity> | any[]): Promise<Entity[]>;
    /**
     * Finds entities that match given find options or conditions.
     */
    executeFindAndCount<Entity>(entityClassOrName: EntityTarget<Entity>, optionsOrConditions?: MongoFindManyOptions<Entity> | Partial<Entity>): Promise<[Entity[], number]>;
}
