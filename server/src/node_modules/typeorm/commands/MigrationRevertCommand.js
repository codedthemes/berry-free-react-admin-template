"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationRevertCommand = void 0;
const tslib_1 = require("tslib");
const PlatformTools_1 = require("../platform/PlatformTools");
const path_1 = tslib_1.__importDefault(require("path"));
const process_1 = tslib_1.__importDefault(require("process"));
const CommandUtils_1 = require("./CommandUtils");
/**
 * Reverts last migration command.
 */
class MigrationRevertCommand {
    constructor() {
        this.command = "migration:revert";
        this.describe = "Reverts last executed migration.";
    }
    builder(args) {
        return args
            .option("dataSource", {
            alias: "d",
            describe: "Path to the file where your DataSource instance is defined.",
            demandOption: true,
        })
            .option("transaction", {
            alias: "t",
            default: "default",
            describe: "Indicates if transaction should be used or not for migration revert. Enabled by default.",
        })
            .option("fake", {
            alias: "f",
            type: "boolean",
            default: false,
            describe: "Fakes reverting the migration",
        });
    }
    async handler(args) {
        var _a;
        let dataSource = undefined;
        try {
            dataSource = await CommandUtils_1.CommandUtils.loadDataSource(path_1.default.resolve(process_1.default.cwd(), args.dataSource));
            dataSource.setOptions({
                subscribers: [],
                synchronize: false,
                migrationsRun: false,
                dropSchema: false,
                logging: ["query", "error", "schema"],
            });
            await dataSource.initialize();
            const options = {
                transaction: (_a = dataSource.options.migrationsTransactionMode) !== null && _a !== void 0 ? _a : "all",
                fake: !!args.f,
            };
            switch (args.t) {
                case "all":
                    options.transaction = "all";
                    break;
                case "none":
                case "false":
                    options.transaction = "none";
                    break;
                case "each":
                    options.transaction = "each";
                    break;
                default:
                // noop
            }
            await dataSource.undoLastMigration(options);
            await dataSource.destroy();
        }
        catch (err) {
            PlatformTools_1.PlatformTools.logCmdErr("Error during migration revert:", err);
            if (dataSource && dataSource.isInitialized)
                await dataSource.destroy();
            process_1.default.exit(1);
        }
    }
}
exports.MigrationRevertCommand = MigrationRevertCommand;

//# sourceMappingURL=MigrationRevertCommand.js.map
