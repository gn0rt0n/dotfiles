"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
const FilePath_1 = require("./FilePath");
class LaravelHelperExtension {
    constructor(context) {
        this._name = "Laravel Helper";
        this._context = context;
        this._outputChannel = vscode.window.createOutputChannel(this._name);
        this._config = this.fetchConfig();
    }
    fetchConfig() {
        var _a, _b;
        const config = vscode.workspace.getConfiguration("helper");
        return {
            isFacade: (_a = config.get("facades")) !== null && _a !== void 0 ? _a : true,
            isModel: (_b = config.get("models")) !== null && _b !== void 0 ? _b : true,
            autoClearConsole: false,
        };
    }
    loadConfig() {
        this._config = this.fetchConfig();
    }
    /** Recursive call to run commands. */
    _runCommands(commandList, document) {
        const commandObject = commandList.shift();
        if (commandObject) {
            this.showOutputMessage(`[CMD] ${commandObject.cmd}`);
            const child = child_process_1.exec(commandObject.cmd, this._getExecOption(document), (error, stdout, stderr) => {
                if (!commandObject.isAsync) {
                    this._runCommands(commandList, document);
                }
                if (error) {
                    console.error(`ERROR: ${error}`);
                    return;
                }
                if (stdout) {
                    console.log(`${stdout}`);
                    this._outputChannel.append(`STDOUT: ${stdout}`);
                }
                if (stderr) {
                    console.error(`ERROR: ${stderr}`);
                    this._outputChannel.append(`ERROR: ${stderr}`);
                }
            });
            // if async, go ahead and run next command
            if (commandObject.isAsync) {
                this._runCommands(commandList, document);
            }
        }
        else {
            // NOTE: This technically just marks the end of commands starting.
            // There could still be asyc commands running.
            this.showStatusMessage("Generation completed.");
        }
    }
    _getExecOption(document) {
        var _a;
        return {
            cwd: (_a = this._getWorkspaceFolderPath(document.uri)) !== null && _a !== void 0 ? _a : "",
        };
    }
    _getWorkspaceFolderPath(uri) {
        var _a, _b;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        // NOTE: rootPath seems to be deprecated but seems like the best fallback so that
        // single project workspaces still work. If I come up with a better option, I'll change it.
        return (_b = (_a = workspaceFolder === null || workspaceFolder === void 0 ? void 0 : workspaceFolder.uri) === null || _a === void 0 ? void 0 : _a.fsPath) !== null && _b !== void 0 ? _b : vscode.workspace.rootPath;
    }
    get isEnabled() {
        return true;
        //return !!this._context.globalState.get('isEnabled', true);
    }
    set isEnabled(value) {
        this._context.globalState.update("isEnabled", value);
        this.showOutputMessage();
    }
    get autoClearConsole() {
        return !!this._config.autoClearConsole;
    }
    get allCommands() {
        return [this._getFacadeCommand(), this._getModelCommand()];
    }
    _getFacadeCommand() {
        return {
            isEnabled: this._config.isFacade,
            cmd: "php artisan ide-helper:generate",
            isAsync: false,
            match: "app",
        };
    }
    _getModelCommand() {
        return {
            isEnabled: this._config.isModel,
            cmd: "php artisan ide-helper:models -n",
            isAsync: false,
            match: "app(\\/models)?\\/(\\w|_)+.php$",
        };
    }
    /**
     * Show message in output channel
     */
    showOutputMessage(message) {
        const newMessage = message !== null && message !== void 0 ? message : `${this._name} ${this.isEnabled ? "enabled" : "disabled"}.`;
        this._outputChannel.appendLine(newMessage);
    }
    _consoleAutoClear() {
        if (this.autoClearConsole) {
            this._outputChannel.clear();
        }
    }
    /**
     * Show message in status bar and output channel.
     * Return a disposable to remove status bar message.
     */
    showStatusMessage(message) {
        this.showOutputMessage(message);
        return vscode.window.setStatusBarMessage(message);
    }
    onFileSave(document) {
        this._consoleAutoClear();
        if (!this.isEnabled) {
            this.showOutputMessage();
            return;
        }
        const filePath = new FilePath_1.default(document.fileName);
        const commands = this.allCommands.filter((cfg) => {
            if (!cfg.isEnabled)
                return false;
            // negation wins over match
            return !filePath.isNeggate(cfg.notMatch) && filePath.isMatch(cfg.match);
        });
        if (commands.length === 0) {
            return;
        }
        this._runCommands(commands, document);
    }
    /**
     * Runs Facade helper generator command
     */
    runAllCommands(document) {
        this._consoleAutoClear();
        const commandList = this.allCommands;
        if (!this.isEnabled) {
            this.showOutputMessage();
            return;
        }
        this._runCommands(commandList, document);
    }
    /**
     * Runs Facade helper generator command
     */
    runFacadeGenerator(document) {
        this._consoleAutoClear();
        const commandList = [this._getFacadeCommand()];
        if (!this.isEnabled) {
            this.showOutputMessage();
            return;
        }
        this._runCommands(commandList, document);
    }
    /**
     * Runs Model helper generator command
     */
    runModelGenerator(document) {
        this._consoleAutoClear();
        const commandList = [this._getModelCommand()];
        if (!this.isEnabled) {
            this.showOutputMessage();
            return;
        }
        this._runCommands(commandList, document);
    }
}
exports.default = LaravelHelperExtension;
//# sourceMappingURL=LaravelHelperExtension.js.map