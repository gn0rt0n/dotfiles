(()=>{"use strict";var e={549:e=>{e.exports=require("vscode")}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}var i={};(()=>{var e=i;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const t=n(549);let o=0;function r(e,n,i){!function(){const e=t.workspace.getConfiguration().get("remove-empty-lines");o=e?e.allowedNumberOfEmptyLines<0||e.allowedNumberOfEmptyLines>=500?0:e.allowedNumberOfEmptyLines:0}(),"number"==typeof i&&(o=i);const{document:r}=e;if(n){const{selections:t}=e;if(1===t.length&&t[0].isEmpty){const n=o;if(o=0,!r.lineAt(t[0].start.line).isEmptyOrWhitespace)return;{const n=function(e,t){for(let n=e;n>0;n--)if(!t.lineAt(n).isEmptyOrWhitespace)return n;return 0}(t[0].start.line,r),i=function(e,t){for(let n=e;n<t.lineCount;n++)if(!t.lineAt(n).isEmptyOrWhitespace)return n;return t.lineCount-1}(t[0].start.line,r);s(e,r,[[n,i]])}o=n}else{const n=[];for(const e of t)n.push([e.start.line,e.end.line]);s(e,r,n)}}else s(e,r,[[0,r.lineCount-1]])}function s(e,t,n){e.edit((e=>{for(const i of n){let n=0;for(let r=i[0];r<=i[1];r++){const i=t.lineAt(r);i.isEmptyOrWhitespace?(n++,n>o&&e.delete(i.rangeIncludingLineBreak)):n=0}}}))}e.activate=function(){t.commands.registerTextEditorCommand("remove-empty-lines.inDocument",((e,t,n)=>{r(e,!1,n)})),t.commands.registerTextEditorCommand("remove-empty-lines.inSelection",((e,t,n)=>{r(e,!0,n)}))},e.deactivate=function(){}})(),module.exports=i})();
//# sourceMappingURL=extension.js.map