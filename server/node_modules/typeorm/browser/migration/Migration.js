/**
 * Represents entity of the migration in the database.
 */
export class Migration {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(id, timestamp, name, instance, transaction) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.instance = instance;
        this.transaction = transaction;
    }
}

//# sourceMappingURL=Migration.js.map
