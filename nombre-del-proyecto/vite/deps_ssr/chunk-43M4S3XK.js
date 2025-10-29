import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-LTNSATDW.js";
import {
  __name,
  __publicField
} from "./chunk-XCKGGG5T.js";

// node_modules/@angular/material/fesm2022/internal-form-field.mjs
var _c0 = ["mat-internal-form-field", ""];
var _c1 = ["*"];
var __MatInternalFormField = class __MatInternalFormField {
  /** Position of the label relative to the content. */
  labelPosition;
};
__name(__MatInternalFormField, "_MatInternalFormField");
__publicField(__MatInternalFormField, "ɵfac", /* @__PURE__ */ __name(function _MatInternalFormField_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || __MatInternalFormField)();
}, "_MatInternalFormField_Factory"));
__publicField(__MatInternalFormField, "ɵcmp", ɵɵdefineComponent({
  type: __MatInternalFormField,
  selectors: [["div", "mat-internal-form-field", ""]],
  hostAttrs: [1, "mdc-form-field", "mat-internal-form-field"],
  hostVars: 2,
  hostBindings: /* @__PURE__ */ __name(function _MatInternalFormField_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("mdc-form-field--align-end", ctx.labelPosition === "before");
    }
  }, "_MatInternalFormField_HostBindings"),
  inputs: {
    labelPosition: "labelPosition"
  },
  attrs: _c0,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: /* @__PURE__ */ __name(function _MatInternalFormField_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  }, "_MatInternalFormField_Template"),
  styles: [".mat-internal-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-flex;align-items:center;vertical-align:middle}.mat-internal-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mat-internal-form-field>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0}\n"],
  encapsulation: 2,
  changeDetection: 0
}));
var _MatInternalFormField = __MatInternalFormField;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatInternalFormField, [{
    type: Component,
    args: [{
      selector: "div[mat-internal-form-field]",
      template: "<ng-content></ng-content>",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mdc-form-field mat-internal-form-field",
        "[class.mdc-form-field--align-end]": 'labelPosition === "before"'
      },
      styles: [".mat-internal-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-flex;align-items:center;vertical-align:middle}.mat-internal-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mat-internal-form-field>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0}\n"]
    }]
  }], null, {
    labelPosition: [{
      type: Input,
      args: [{
        required: true
      }]
    }]
  });
})();

export {
  _MatInternalFormField
};
//# sourceMappingURL=chunk-43M4S3XK.js.map
