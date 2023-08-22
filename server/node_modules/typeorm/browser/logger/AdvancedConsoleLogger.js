import { PlatformTools } from "../platform/PlatformTools";
import { AbstractLogger } from "./AbstractLogger";
/**
 * Performs logging of the events in TypeORM.
 * This version of logger uses console to log events and use syntax highlighting.
 */
export class AdvancedConsoleLogger extends AbstractLogger {
    /**
     * Write log to specific output.
     */
    writeLog(level, logMessage, queryRunner) {
        var _a;
        const messages = this.prepareLogMessages(logMessage);
        for (let message of messages) {
            switch ((_a = message.type) !== null && _a !== void 0 ? _a : level) {
                case "log":
                case "schema-build":
                case "migration":
                    PlatformTools.log(String(message.message));
                    break;
                case "info":
                case "query":
                    if (message.prefix) {
                        PlatformTools.logInfo(message.prefix, message.message);
                    }
                    else {
                        PlatformTools.log(String(message.message));
                    }
                    break;
                case "warn":
                case "query-slow":
                    if (message.prefix) {
                        PlatformTools.logWarn(message.prefix, message.message);
                    }
                    else {
                        console.warn(PlatformTools.warn(String(message.message)));
                    }
                    break;
                case "error":
                case "query-error":
                    if (message.prefix) {
                        PlatformTools.logError(message.prefix, String(message.message));
                    }
                    else {
                        console.error(PlatformTools.error(String(message.message)));
                    }
                    break;
            }
        }
    }
}

//# sourceMappingURL=AdvancedConsoleLogger.js.map
