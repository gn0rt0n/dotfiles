"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const LaravelHelperExtension_1 = require("./LaravelHelperExtension");
const extensionId = "laravelIdeHelper";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const extension = new LaravelHelperExtension_1.default(context);
    extension.showOutputMessage();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand(`${extensionId}.laravelGenerateAll`, () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        extension.runAllCommands(activeEditor.document);
        vscode.window.showInformationMessage("Generating Helper files!");
    }));
    context.subscriptions.push(vscode.commands.registerCommand(`${extensionId}.laravelFacadeGenerate`, () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        extension.runFacadeGenerator(activeEditor.document);
        vscode.window.showInformationMessage("Generating Helper files!");
    }));
    context.subscriptions.push(vscode.commands.registerCommand(`${extensionId}.laravelModelGenerate`, () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        extension.runModelGenerator(activeEditor.document);
        vscode.window.showInformationMessage("Generating Helper files!");
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
        const disposeStatus = extension.showStatusMessage("Reloading config.");
        extension.loadConfig();
        disposeStatus.dispose();
    }));
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument((document) => {
        extension.onFileSave(document);
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map