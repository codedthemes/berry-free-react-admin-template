import { AbstractLogger } from "./AbstractLogger";
import { debug } from "debug";
/**
 * Performs logging of the events in TypeORM via debug library.
 */
export class DebugLogger extends AbstractLogger {
    constructor() {
        super(...arguments);
        /**
         * Object with all debug logger.
         */
        this.logger = {
            log: debug("typeorm:log"),
            info: debug("typeorm:info"),
            warn: debug("typeorm:warn"),
            error: debug("typeorm:error"),
            query: debug("typeorm:query:log"),
            "query-error": debug("typeorm:query:error"),
            "query-slow": debug("typeorm:query:slow"),
            "schema-build": debug("typeorm:schema"),
            migration: debug("typeorm:migration"),
        };
    }
    /**
     * Check is logging for level or message type is enabled.
     */
    isLogEnabledFor(type) {
        switch (type) {
            case "query":
                return this.logger["query"].enabled;
            case "query-error":
                return this.logger["query-error"].enabled;
            case "query-slow":
                return true;
            case "schema":
            case "schema-build":
                return this.logger["schema-build"].enabled;
            case "migration":
                return this.logger["migration"].enabled;
            case "log":
                return this.logger["log"].enabled;
            case "info":
                return this.logger["info"].enabled;
            case "warn":
                return this.logger["warn"].enabled;
            default:
                return false;
        }
    }
    /**
     * Write log to specific output.
     */
    writeLog(level, logMessage, queryRunner) {
        var _a;
        const messages = this.prepareLogMessages(logMessage, {
            appendParameterAsComment: false,
        });
        for (let message of messages) {
            const messageTypeOrLevel = (_a = message.type) !== null && _a !== void 0 ? _a : level;
            if (messageTypeOrLevel in this.logger) {
                if (message.prefix) {
                    this.logger[messageTypeOrLevel](message.prefix, message.message);
                }
                else {
                    this.logger[messageTypeOrLevel](message.message);
                }
                if (message.parameters && message.parameters.length) {
                    this.logger[messageTypeOrLevel]("parameters:", message.parameters);
                }
            }
        }
    }
}

//# sourceMappingURL=DebugLogger.js.map
