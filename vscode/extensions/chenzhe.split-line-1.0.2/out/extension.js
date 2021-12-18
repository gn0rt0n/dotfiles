"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const split_1 = require("./split");
function activate(context) {
    const COMMAND = 'extension.splitLine';
    const OPT_BREAK_START_END = 'breakStartEnd';
    const OPT_BREAK_BEFORE = 'breakBeforeSeparator';
    const commandHandler = function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            let sep;
            let breakStartEnd = false;
            let breakBeforeSeparator = false;
            if (!args) {
                sep = yield vscode.window.showInputBox({
                    placeHolder: 'input separator for split.'
                });
                if (!sep) {
                    return;
                }
                const optionSelected = (yield vscode.window.showQuickPick([
                    { label: OPT_BREAK_START_END, description: 'break line in the start and end of selected string' },
                    { label: OPT_BREAK_BEFORE, description: 'break line before separator' },
                ], {
                    canPickMany: true,
                    placeHolder: 'choose break line option.'
                })) || [];
                breakStartEnd = optionSelected.some((opt) => opt.label === OPT_BREAK_START_END);
                breakBeforeSeparator = optionSelected.some((opt) => opt.label === OPT_BREAK_BEFORE);
            }
            else {
                sep = args.separator || ',';
                breakStartEnd = !!args.breakStartEnd;
                breakBeforeSeparator = !!args.breakBeforeSeparator;
            }
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            const document = editor.document;
            const selection = editor.selection;
            const word = document.getText(selection);
            if (!word.trim().length) {
                return;
            }
            const lines = split_1.default(word, sep, {
                breakStartEnd,
                breakBeforeSeparator,
            });
            yield editor.edit(builder => {
                builder.replace(selection, lines);
            });
            yield vscode.commands.executeCommand('editor.action.formatSelection', document.uri, selection);
        });
    };
    let disposable = vscode.commands.registerCommand(COMMAND, commandHandler);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map