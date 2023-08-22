import appRootPath from "app-root-path";
import { PlatformTools } from "../platform/PlatformTools";
import { AbstractLogger } from "./AbstractLogger";
/**
 * Performs logging of the events in TypeORM.
 * This version of logger logs everything into ormlogs.log file.
 */
export class FileLogger extends AbstractLogger {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(options, fileLoggerOptions) {
        super(options);
        this.fileLoggerOptions = fileLoggerOptions;
    }
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Write log to specific output.
     */
    writeLog(level, logMessage, queryRunner) {
        var _a, _b;
        const messages = this.prepareLogMessages(logMessage, {
            highlightSql: false,
            addColonToPrefix: false,
        });
        const strings = [];
        for (let message of messages) {
            switch ((_a = message.type) !== null && _a !== void 0 ? _a : level) {
                case "log":
                    strings.push(`[LOG]: ${message.message}`);
                    break;
                case "schema-build":
                case "migration":
                    strings.push(String(message.message));
                    break;
                case "info":
                    strings.push(`[INFO]: ${message.message}`);
                    break;
                case "query":
                    strings.push(`[QUERY]: ${message.message}`);
                    break;
                case "warn":
                    strings.push(`[WARN]: ${message.message}`);
                    break;
                case "query-slow":
                    if (message.prefix === "execution time") {
                        continue;
                    }
                    this.write(`[SLOW QUERY: ${(_b = message.additionalInfo) === null || _b === void 0 ? void 0 : _b.time} ms]: ${message.message}`);
                    break;
                case "error":
                case "query-error":
                    if (message.prefix === "query failed") {
                        strings.push(`[FAILED QUERY]: ${message.message}`);
                    }
                    else if (message.type === "query-error") {
                        strings.push(`[QUERY ERROR]: ${message.message}`);
                    }
                    else {
                        strings.push(`[ERROR]: ${message.message}`);
                    }
                    break;
            }
        }
        this.write(strings);
    }
    /**
     * Writes given strings into the log file.
     */
    write(strings) {
        strings = Array.isArray(strings) ? strings : [strings];
        const basePath = appRootPath.path + "/";
        let logPath = "ormlogs.log";
        if (this.fileLoggerOptions && this.fileLoggerOptions.logPath) {
            logPath = PlatformTools.pathNormalize(this.fileLoggerOptions.logPath);
        }
        strings = strings.map((str) => "[" + new Date().toISOString() + "]" + str);
        PlatformTools.appendFileSync(basePath + logPath, strings.join("\r\n") + "\r\n"); // todo: use async or implement promises?
    }
}

//# sourceMappingURL=FileLogger.js.map
