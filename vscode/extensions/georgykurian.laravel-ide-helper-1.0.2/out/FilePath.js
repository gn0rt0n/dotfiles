"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilePath {
    constructor(path) {
        this._path = this._parse(path);
    }
    _parse(path) {
        return path.replace(/\\/g, "/");
    }
    _matchFilePath(pattern, parsedPath) {
        return (pattern != null &&
            pattern.length > 0 &&
            new RegExp(pattern, "i").test(parsedPath));
    }
    isMatch(pattern = ".*?") {
        // if no match pattern was provided, or if match pattern succeeds
        return pattern.length === 0 || this._matchFilePath(pattern, this._path);
    }
    isNeggate(pattern = "") {
        // negation has to be explicitly provided
        return pattern.length > 0 && this._matchFilePath(pattern, this._path);
    }
}
exports.default = FilePath;
//# sourceMappingURL=FilePath.js.map