"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConfig = exports.changeConfig = exports.sleep = exports.openFile = exports.doc = void 0;
const vscode = require("vscode");
const vscode_1 = require("vscode");
async function doc(content, language) {
    return await vscode.workspace.openTextDocument({
        language,
        content,
    });
}
exports.doc = doc;
async function openFile(content) {
    const document = doc(content);
    vscode.window.showTextDocument(await document);
    return document;
}
exports.openFile = openFile;
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
async function changeConfig(settings) {
    const assistant = vscode.workspace.getConfiguration();
    await assistant.update("assistant", settings, vscode_1.ConfigurationTarget.Global);
}
exports.changeConfig = changeConfig;
async function clearConfig() {
    await changeConfig({
        rules: [],
    });
}
exports.clearConfig = clearConfig;
//# sourceMappingURL=helper.js.map