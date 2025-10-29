import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MatRipple
} from "./chunk-LDKCHQRY.js";
import {
  MatCommonModule
} from "./chunk-GP3HO4UL.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-LTNSATDW.js";
import {
  __name,
  __publicField
} from "./chunk-XCKGGG5T.js";

// node_modules/@angular/material/fesm2022/ripple-module.mjs
var _MatRippleModule = class _MatRippleModule {
};
__name(_MatRippleModule, "MatRippleModule");
__publicField(_MatRippleModule, "ɵfac", /* @__PURE__ */ __name(function MatRippleModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatRippleModule)();
}, "MatRippleModule_Factory"));
__publicField(_MatRippleModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatRippleModule,
  imports: [MatCommonModule, MatRipple],
  exports: [MatRipple, MatCommonModule]
}));
__publicField(_MatRippleModule, "ɵinj", ɵɵdefineInjector({
  imports: [MatCommonModule, MatCommonModule]
}));
var MatRippleModule = _MatRippleModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatRipple],
      exports: [MatRipple, MatCommonModule]
    }]
  }], null, null);
})();

export {
  MatRippleModule
};
//# sourceMappingURL=chunk-HBFSH7DZ.js.map
