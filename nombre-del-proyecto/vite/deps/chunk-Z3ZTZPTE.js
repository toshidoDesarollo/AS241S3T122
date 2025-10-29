import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-55LYZL4Q.js";
import {
  MatCommonModule,
  ObserversModule
} from "./chunk-J3HVXLVM.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-H3AHVZEA.js";
import {
  __name,
  __publicField
} from "./chunk-Z56SSN6E.js";

// node_modules/@angular/material/fesm2022/form-field-module.mjs
var _MatFormFieldModule = class _MatFormFieldModule {
};
__name(_MatFormFieldModule, "MatFormFieldModule");
__publicField(_MatFormFieldModule, "ɵfac", /* @__PURE__ */ __name(function MatFormFieldModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatFormFieldModule)();
}, "MatFormFieldModule_Factory"));
__publicField(_MatFormFieldModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatFormFieldModule,
  imports: [MatCommonModule, ObserversModule, MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix],
  exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule]
}));
__publicField(_MatFormFieldModule, "ɵinj", ɵɵdefineInjector({
  imports: [MatCommonModule, ObserversModule, MatFormField, MatCommonModule]
}));
var MatFormFieldModule = _MatFormFieldModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, ObserversModule, MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix],
      exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule]
    }]
  }], null, null);
})();

export {
  MatFormFieldModule
};
//# sourceMappingURL=chunk-Z3ZTZPTE.js.map
