import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MatCommonModule
} from "./chunk-GP3HO4UL.js";
import {
  Directive,
  NgModule,
  setClassMetadata,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-LTNSATDW.js";
import {
  require_operators
} from "./chunk-UIYHWEA5.js";
import {
  __name,
  __publicField,
  __toESM
} from "./chunk-XCKGGG5T.js";

// node_modules/@angular/material/fesm2022/line.mjs
var import_operators = __toESM(require_operators(), 1);
var _MatLine = class _MatLine {
};
__name(_MatLine, "MatLine");
__publicField(_MatLine, "ɵfac", /* @__PURE__ */ __name(function MatLine_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatLine)();
}, "MatLine_Factory"));
__publicField(_MatLine, "ɵdir", ɵɵdefineDirective({
  type: _MatLine,
  selectors: [["", "mat-line", ""], ["", "matLine", ""]],
  hostAttrs: [1, "mat-line"]
}));
var MatLine = _MatLine;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatLine, [{
    type: Directive,
    args: [{
      selector: "[mat-line], [matLine]",
      host: {
        "class": "mat-line"
      }
    }]
  }], null, null);
})();
function setLines(lines, element, prefix = "mat") {
  lines.changes.pipe((0, import_operators.startWith)(lines)).subscribe(({
    length
  }) => {
    setClass(element, `${prefix}-2-line`, false);
    setClass(element, `${prefix}-3-line`, false);
    setClass(element, `${prefix}-multi-line`, false);
    if (length === 2 || length === 3) {
      setClass(element, `${prefix}-${length}-line`, true);
    } else if (length > 3) {
      setClass(element, `${prefix}-multi-line`, true);
    }
  });
}
__name(setLines, "setLines");
function setClass(element, className, isAdd) {
  element.nativeElement.classList.toggle(className, isAdd);
}
__name(setClass, "setClass");
var _MatLineModule = class _MatLineModule {
};
__name(_MatLineModule, "MatLineModule");
__publicField(_MatLineModule, "ɵfac", /* @__PURE__ */ __name(function MatLineModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatLineModule)();
}, "MatLineModule_Factory"));
__publicField(_MatLineModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatLineModule,
  imports: [MatCommonModule, MatLine],
  exports: [MatLine, MatCommonModule]
}));
__publicField(_MatLineModule, "ɵinj", ɵɵdefineInjector({
  imports: [MatCommonModule, MatCommonModule]
}));
var MatLineModule = _MatLineModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatLineModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatLine],
      exports: [MatLine, MatCommonModule]
    }]
  }], null, null);
})();

export {
  MatLine,
  setLines,
  MatLineModule
};
//# sourceMappingURL=chunk-66O3GCSO.js.map
