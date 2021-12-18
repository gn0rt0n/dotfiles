"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * split input string into lines
 * this method can be able to handle complicated nested cases
 * @export
 * @param origin origin single line string
 * @param [sep=","] separator
 * @param opt option
 * @returns result string already split into lines by '\n'
 */
function splitIntoLines(origin, sep = ",", opt = {}) {
    const str = origin.trim();
    if (!str.length) {
        return origin;
    }
    const sepIndexes = findValidSeparator(str, sep);
    const strArr = str.split("");
    const addLineBreak = opt.breakBeforeSeparator
        ? (index) => { strArr[index] = '\n' + strArr[index]; }
        : (index) => { strArr[index] += '\n'; };
    sepIndexes.forEach(addLineBreak);
    const ret = strArr.join("");
    return opt.breakStartEnd
        ? '\n' + ret + '\n'
        : ret;
}
exports.default = splitIntoLines;
const startBracketReg = /[\{\[\(]/;
const endBracketReg = /[\}\]\)]/;
const quoteReg = /['"`]/;
/** only find separator which is not inside {} [] () '' "" `` */
function findValidSeparator(str, sep) {
    let currentQuote = '';
    let inString = false;
    let inBracketCount = 0;
    let sepIndexArr = [];
    for (let i = 0; i < str.length; i++) {
        const c = str[i];
        switch (true) {
            case endBracketReg.test(c):
                if (inString) {
                    break;
                }
                // occurs right single bracket, clear sepIndex
                if (!inBracketCount) {
                    sepIndexArr = [];
                }
                else {
                    inBracketCount--;
                }
                break;
            case startBracketReg.test(c):
                // occurs left bracket, change into in-bracket state
                if (!inString) {
                    inBracketCount++;
                }
                break;
            case quoteReg.test(c):
                if (!inString) {
                    currentQuote = c;
                    inString = true;
                }
                else if (c === currentQuote) {
                    inString = false;
                }
                break;
            case c === sep:
                if (!inString && !inBracketCount) {
                    sepIndexArr.push(i);
                }
                break;
            default:
                break;
        }
    }
    return sepIndexArr;
}
//# sourceMappingURL=split.js.map