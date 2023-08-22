
import { QueryRunner } from "../../query-runner/QueryRunner";
import { TableColumn } from "../../schema-builder/table/TableColumn";
import { Table } from "../../schema-builder/table/Table";
import { TableForeignKey } from "../../schema-builder/table/TableForeignKey";
import { TableIndex } from "../../schema-builder/table/TableIndex";
import { View } from "../../schema-builder/view/View";
import { ReadStream } from "../../platform/PlatformTools";
import { MongoEntityManager } from "../../entity-manager/MongoEntityManager";
import { SqlInMemory } from "../SqlInMemory";
import { TableUnique } from "../../schema-builder/table/TableUnique";
import { Broadcaster } from "../../subscriber/Broadcaster";
import { TableCheck } from "../../schema-builder/table/TableCheck";
import { TableExclusion } from "../../schema-builder/table/TableExclusion";
import { BulkWriteResult, AggregationCursor, MongoClient, Collection, FindCursor, Document, AggregateOptions, AnyBulkWriteOperation, BulkWriteOptions, Filter, CountOptions, CountDocumentsOptions, IndexSpecification, CreateIndexesOptions, IndexDescription, DeleteResult, DeleteOptions, CommandOperationOptions, FindOneAndDeleteOptions, FindOneAndReplaceOptions, UpdateFilter, FindOneAndUpdateOptions, RenameOptions, ReplaceOptions, UpdateResult, CollStats, CollStatsOptions, ChangeStreamOptions, ChangeStream, UpdateOptions, ListIndexesOptions, ListIndexesCursor, OptionalId, InsertOneOptions, InsertOneResult, InsertManyResult, UnorderedBulkOperation, OrderedBulkOperation, IndexInformationOptions } from "../../driver/mongodb/typings";
import { DataSource } from "../../data-source/DataSource";
import { ReplicationMode } from "../types/ReplicationMode";
/**
 * Runs queries on a single MongoDB connection.
 */
export declare class MongoQueryRunner implements QueryRunner {
    /**
     * Connection used by this query runner.
     */
    connection: DataSource;
    /**
     * Broadcaster used on this query runner to broadcast entity events.
     */
    broadcaster: Broadcaster;
    /**
     * Entity manager working only with current query runner.
     */
    manager: MongoEntityManager;
    /**
     * Indicates if connection for this query runner is released.
     * Once its released, query runner cannot run queries anymore.
     * Always false for mongodb since mongodb has a single query executor instance.
     */
    isReleased: boolean;
    /**
     * Indicates if transaction is active in this query executor.
     * Always false for mongodb since mongodb does not support transactions.
     */
    isTransactionActive: boolean;
    /**
     * Stores temporarily user data.
     * Useful for sharing data with subscribers.
     */
    data: {};
    /**
     * All synchronized tables in the database.
     */
    loadedTables: Table[];
    /**
     * All synchronized views in the database.
     */
    loadedViews: View[];
    /**
     * Real database connection from a connection pool used to perform queries.
     */
    databaseConnection: MongoClient;
    constructor(connection: DataSource, databaseConnection: MongoClient);
    /**
     * Called before migrations are run.
     */
    beforeMigration(): Promise<void>;
    /**
     * Called after migrations are run.
     */
    afterMigration(): Promise<void>;
    /**
     * Creates a cursor for a query that can be used to iterate over results from MongoDB.
     */
    cursor(collectionName: string, filter: Filter<Document>): FindCursor<any>;
    /**
     * Execute an aggregation framework pipeline against the collection.
     */
    aggregate(collectionName: string, pipeline: Document[], options?: AggregateOptions): AggregationCursor<any>;
    /**
     * Perform a bulkWrite operation without a fluent API.
     */
    bulkWrite(collectionName: string, operations: AnyBulkWriteOperation<Document>[], options?: BulkWriteOptions): Promise<BulkWriteResult>;
    /**
     * Count number of matching documents in the db to a query.
     */
    count(collectionName: string, filter: Filter<Document>, options?: CountOptions): Promise<number>;
    /**
     * Count number of matching documents in the db to a query.
     */
    countDocuments(collectionName: string, filter: Filter<Document>, options?: CountDocumentsOptions): Promise<any>;
    /**
     * Creates an index on the db and collection.
     */
    createCollectionIndex(collectionName: string, indexSpec: IndexSpecification, options?: CreateIndexesOptions): Promise<string>;
    /**
     * Creates multiple indexes in the collection, this method is only supported for MongoDB 2.6 or higher.
     * Earlier version of MongoDB will throw a command not supported error. Index specifications are defined at http://docs.mongodb.org/manual/reference/command/createIndexes/.
     */
    createCollectionIndexes(collectionName: string, indexSpecs: IndexDescription[]): Promise<string[]>;
    /**
     * Delete multiple documents on MongoDB.
     */
    deleteMany(collectionName: string, filter: Filter<Document>, options: DeleteOptions): Promise<DeleteResult>;
    /**
     * Delete a document on MongoDB.
     */
    deleteOne(collectionName: string, filter: Filter<Document>, options?: DeleteOptions): Promise<DeleteResult>;
    /**
     * The distinct command returns returns a list of distinct values for the given key across a collection.
     */
    distinct(collectionName: string, key: any, filter: Filter<Document>, options?: CommandOperationOptions): Promise<any>;
    /**
     * Drops an index from this collection.
     */
    dropCollectionIndex(collectionName: string, indexName: string, options?: CommandOperationOptions): Promise<Document>;
    /**
     * Drops all indexes from the collection.
     */
    dropCollectionIndexes(collectionName: string): Promise<Document>;
    /**
     * Find a document and delete it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndDelete(collectionName: string, filter: Filter<Document>, options?: FindOneAndDeleteOptions): Promise<Document>;
    /**
     * Find a document and replace it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndReplace(collectionName: string, filter: Filter<Document>, replacement: Document, options?: FindOneAndReplaceOptions): Promise<Document>;
    /**
     * Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
     */
    findOneAndUpdate(collectionName: string, filter: Filter<Document>, update: UpdateFilter<Document>, options?: FindOneAndUpdateOptions): Promise<Document>;
    /**
     * Retrieve all the indexes on the collection.
     */
    collectionIndexes(collectionName: string): Promise<Document>;
    /**
     * Retrieve all the indexes on the collection.
     */
    collectionIndexExists(collectionName: string, indexes: string | string[]): Promise<boolean>;
    /**
     * Retrieves this collections index info.
     */
    collectionIndexInformation(collectionName: string, options?: IndexInformationOptions): Promise<any>;
    /**
     * Initiate an In order bulk write operation, operations will be serially executed in the order they are added, creating a new operation for each switch in types.
     */
    initializeOrderedBulkOp(collectionName: string, options?: BulkWriteOptions): OrderedBulkOperation;
    /**
     * Initiate a Out of order batch write operation. All operations will be buffered into insert/update/remove commands executed out of order.
     */
    initializeUnorderedBulkOp(collectionName: string, options?: BulkWriteOptions): UnorderedBulkOperation;
    /**
     * Inserts an array of documents into MongoDB.
     */
    insertMany(collectionName: string, docs: OptionalId<Document>[], options?: BulkWriteOptions): Promise<InsertManyResult>;
    /**
     * Inserts a single document into MongoDB.
     */
    insertOne(collectionName: string, doc: OptionalId<Document>, options?: InsertOneOptions): Promise<InsertOneResult>;
    /**
     * Returns if the collection is a capped collection.
     */
    isCapped(collectionName: string): Promise<boolean>;
    /**
     * Get the list of all indexes information for the collection.
     */
    listCollectionIndexes(collectionName: string, options?: ListIndexesOptions): ListIndexesCursor;
    /**
     * Reindex all indexes on the collection Warning: reIndex is a blocking operation (indexes are rebuilt in the foreground) and will be slow for large collections.
     */
    rename(collectionName: string, newName: string, options?: RenameOptions): Promise<Collection<Document>>;
    /**
     * Replace a document on MongoDB.
     */
    replaceOne(collectionName: string, filter: Filter<Document>, replacement: Document, options?: ReplaceOptions): Promise<Document | UpdateResult>;
    /**
     * Get all the collection statistics.
     */
    stats(collectionName: string, options?: CollStatsOptions): Promise<CollStats>;
    /**
     * Watching new changes as stream.
     */
    watch(collectionName: string, pipeline?: Document[], options?: ChangeStreamOptions): ChangeStream;
    /**
     * Update multiple documents on MongoDB.
     */
    updateMany(collectionName: string, filter: Filter<Document>, update: UpdateFilter<Document>, options?: UpdateOptions): Promise<Document | UpdateResult>;
    /**
     * Update a single document on MongoDB.
     */
    updateOne(collectionName: string, filter: Filter<Document>, update: UpdateFilter<Document>, options?: UpdateOptions): Promise<Document | UpdateResult>;
    /**
     * Removes all collections from the currently connected database.
     * Be careful with using this method and avoid using it in production or migrations
     * (because it can clear all your database).
     */
    clearDatabase(): Promise<void>;
    /**
     * For MongoDB database we don't create connection, because its single connection already created by a driver.
     */
    connect(): Promise<any>;
    /**
     * For MongoDB database we don't release connection, because its single connection.
     */
    release(): Promise<void>;
    /**
     * Starts transaction.
     */
    startTransaction(): Promise<void>;
    /**
     * Commits transaction.
     */
    commitTransaction(): Promise<void>;
    /**
     * Rollbacks transaction.
     */
    rollbackTransaction(): Promise<void>;
    /**
     * Executes a given SQL query.
     */
    query(query: string, parameters?: any[]): Promise<any>;
    /**
     * Returns raw data stream.
     */
    stream(query: string, parameters?: any[], onEnd?: Function, onError?: Function): Promise<ReadStream>;
    /**
     * Insert a new row with given values into the given table.
     * Returns value of inserted object id.

    async insert(collectionName: string, keyValues: ObjectLiteral): Promise<any> { // todo: fix any
        const results = await this.databaseConnection
            .collection(collectionName)
            .insertOne(keyValues);
        const generatedMap = this.connection.getMetadata(collectionName).objectIdColumn!.createValueMap(results.insertedId);
        return {
            result: results,
            generatedMap: generatedMap
        };
    }*/
    /**
     * Updates rows that match given conditions in the given table.

    async update(collectionName: string, valuesMap: ObjectLiteral, conditions: ObjectLiteral): Promise<any> { // todo: fix any
        await this.databaseConnection
            .collection(collectionName)
            .updateOne(conditions, valuesMap);
    }*/
    /**
     * Deletes from the given table by a given conditions.

    async delete(collectionName: string, conditions: ObjectLiteral|ObjectLiteral[]|string, maybeParameters?: any[]): Promise<any> { // todo: fix any
        if (typeof conditions === "string")
            throw new TypeORMError(`String condition is not supported by MongoDB driver.`);

        await this.databaseConnection
            .collection(collectionName)
            .deleteOne(conditions);
    }*/
    /**
     * Returns all available database names including system databases.
     */
    getDatabases(): Promise<string[]>;
    /**
     * Returns all available schema names including system schemas.
     * If database parameter specified, returns schemas of that database.
     */
    getSchemas(database?: string): Promise<string[]>;
    /**
     * Loads given table's data from the database.
     */
    getTable(collectionName: string): Promise<Table | undefined>;
    /**
     * Loads all tables (with given names) from the database and creates a Table from them.
     */
    getTables(collectionNames: string[]): Promise<Table[]>;
    /**
     * Loads given views's data from the database.
     */
    getView(collectionName: string): Promise<View | undefined>;
    /**
     * Loads all views (with given names) from the database and creates a Table from them.
     */
    getViews(collectionNames: string[]): Promise<View[]>;
    getReplicationMode(): ReplicationMode;
    /**
     * Checks if database with the given name exist.
     */
    hasDatabase(database: string): Promise<boolean>;
    /**
     * Loads currently using database
     */
    getCurrentDatabase(): Promise<undefined>;
    /**
     * Checks if schema with the given name exist.
     */
    hasSchema(schema: string): Promise<boolean>;
    /**
     * Loads currently using database schema
     */
    getCurrentSchema(): Promise<undefined>;
    /**
     * Checks if table with the given name exist in the database.
     */
    hasTable(collectionName: string): Promise<boolean>;
    /**
     * Checks if column with the given name exist in the given table.
     */
    hasColumn(tableOrName: Table | string, columnName: string): Promise<boolean>;
    /**
     * Creates a database if it's not created.
     */
    createDatabase(database: string): Promise<void>;
    /**
     * Drops database.
     */
    dropDatabase(database: string, ifExist?: boolean): Promise<void>;
    /**
     * Creates a new table schema.
     */
    createSchema(schemaPath: string, ifNotExist?: boolean): Promise<void>;
    /**
     * Drops table schema.
     */
    dropSchema(schemaPath: string, ifExist?: boolean): Promise<void>;
    /**
     * Creates a new table from the given table and columns inside it.
     */
    createTable(table: Table): Promise<void>;
    /**
     * Drops the table.
     */
    dropTable(tableName: Table | string): Promise<void>;
    /**
     * Creates a new view.
     */
    createView(view: View): Promise<void>;
    /**
     * Drops the view.
     */
    dropView(target: View | string): Promise<void>;
    /**
     * Renames the given table.
     */
    renameTable(oldTableOrName: Table | string, newTableOrName: Table | string): Promise<void>;
    /**
     * Creates a new column from the column in the table.
     */
    addColumn(tableOrName: Table | string, column: TableColumn): Promise<void>;
    /**
     * Creates a new columns from the column in the table.
     */
    addColumns(tableOrName: Table | string, columns: TableColumn[]): Promise<void>;
    /**
     * Renames column in the given table.
     */
    renameColumn(tableOrName: Table | string, oldTableColumnOrName: TableColumn | string, newTableColumnOrName: TableColumn | string): Promise<void>;
    /**
     * Changes a column in the table.
     */
    changeColumn(tableOrName: Table | string, oldTableColumnOrName: TableColumn | string, newColumn: TableColumn): Promise<void>;
    /**
     * Changes a column in the table.
     */
    changeColumns(tableOrName: Table | string, changedColumns: {
        newColumn: TableColumn;
        oldColumn: TableColumn;
    }[]): Promise<void>;
    /**
     * Drops column in the table.
     */
    dropColumn(tableOrName: Table | string, columnOrName: TableColumn | string): Promise<void>;
    /**
     * Drops the columns in the table.
     */
    dropColumns(tableOrName: Table | string, columns: TableColumn[] | string[]): Promise<void>;
    /**
     * Creates a new primary key.
     */
    createPrimaryKey(tableOrName: Table | string, columnNames: string[]): Promise<void>;
    /**
     * Updates composite primary keys.
     */
    updatePrimaryKeys(tableOrName: Table | string, columns: TableColumn[]): Promise<void>;
    /**
     * Drops a primary key.
     */
    dropPrimaryKey(tableOrName: Table | string): Promise<void>;
    /**
     * Creates a new unique constraint.
     */
    createUniqueConstraint(tableOrName: Table | string, uniqueConstraint: TableUnique): Promise<void>;
    /**
     * Creates a new unique constraints.
     */
    createUniqueConstraints(tableOrName: Table | string, uniqueConstraints: TableUnique[]): Promise<void>;
    /**
     * Drops an unique constraint.
     */
    dropUniqueConstraint(tableOrName: Table | string, uniqueOrName: TableUnique | string): Promise<void>;
    /**
     * Drops an unique constraints.
     */
    dropUniqueConstraints(tableOrName: Table | string, uniqueConstraints: TableUnique[]): Promise<void>;
    /**
     * Creates a new check constraint.
     */
    createCheckConstraint(tableOrName: Table | string, checkConstraint: TableCheck): Promise<void>;
    /**
     * Creates a new check constraints.
     */
    createCheckConstraints(tableOrName: Table | string, checkConstraints: TableCheck[]): Promise<void>;
    /**
     * Drops check constraint.
     */
    dropCheckConstraint(tableOrName: Table | string, checkOrName: TableCheck | string): Promise<void>;
    /**
     * Drops check constraints.
     */
    dropCheckConstraints(tableOrName: Table | string, checkConstraints: TableCheck[]): Promise<void>;
    /**
     * Creates a new exclusion constraint.
     */
    createExclusionConstraint(tableOrName: Table | string, exclusionConstraint: TableExclusion): Promise<void>;
    /**
     * Creates a new exclusion constraints.
     */
    createExclusionConstraints(tableOrName: Table | string, exclusionConstraints: TableExclusion[]): Promise<void>;
    /**
     * Drops exclusion constraint.
     */
    dropExclusionConstraint(tableOrName: Table | string, exclusionOrName: TableExclusion | string): Promise<void>;
    /**
     * Drops exclusion constraints.
     */
    dropExclusionConstraints(tableOrName: Table | string, exclusionConstraints: TableExclusion[]): Promise<void>;
    /**
     * Creates a new foreign key.
     */
    createForeignKey(tableOrName: Table | string, foreignKey: TableForeignKey): Promise<void>;
    /**
     * Creates a new foreign keys.
     */
    createForeignKeys(tableOrName: Table | string, foreignKeys: TableForeignKey[]): Promise<void>;
    /**
     * Drops a foreign key from the table.
     */
    dropForeignKey(tableOrName: Table | string, foreignKey: TableForeignKey): Promise<void>;
    /**
     * Drops a foreign keys from the table.
     */
    dropForeignKeys(tableOrName: Table | string, foreignKeys: TableForeignKey[]): Promise<void>;
    /**
     * Creates a new index.
     */
    createIndex(tableOrName: Table | string, index: TableIndex): Promise<void>;
    /**
     * Creates a new indices
     */
    createIndices(tableOrName: Table | string, indices: TableIndex[]): Promise<void>;
    /**
     * Drops an index from the table.
     */
    dropIndex(collectionName: string, indexName: string): Promise<void>;
    /**
     * Drops an indices from the table.
     */
    dropIndices(tableOrName: Table | string, indices: TableIndex[]): Promise<void>;
    /**
     * Drops collection.
     */
    clearTable(collectionName: string): Promise<void>;
    /**
     * Enables special query runner mode in which sql queries won't be executed,
     * instead they will be memorized into a special variable inside query runner.
     * You can get memorized sql using getMemorySql() method.
     */
    enableSqlMemory(): void;
    /**
     * Disables special query runner mode in which sql queries won't be executed
     * started by calling enableSqlMemory() method.
     *
     * Previously memorized sql will be flushed.
     */
    disableSqlMemory(): void;
    /**
     * Flushes all memorized sqls.
     */
    clearSqlMemory(): void;
    /**
     * Gets sql stored in the memory. Parameters in the sql are already replaced.
     */
    getMemorySql(): SqlInMemory;
    /**
     * Executes up sql queries.
     */
    executeMemoryUpSql(): Promise<void>;
    /**
     * Executes down sql queries.
     */
    executeMemoryDownSql(): Promise<void>;
    /**
     * Gets collection from the database with a given name.
     */
    protected getCollection(collectionName: string): Collection<any>;
}
