import {
  coerceBooleanProperty
} from "./chunk-EURNGT5W.js";
import {
  MatCommonModule
} from "./chunk-J3HVXLVM.js";
import "./chunk-DRGRLKGG.js";
import "./chunk-MWEPKM45.js";
import "./chunk-SPJVBSJ4.js";
import "./chunk-WGFF3YEZ.js";
import "./chunk-BLVT4R4V.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-H3AHVZEA.js";
import "./chunk-UI6KUZ2C.js";
import "./chunk-ZUHKEHKF.js";
import "./chunk-VGY65NYZ.js";
import {
  __name,
  __publicField
} from "./chunk-Z56SSN6E.js";

// node_modules/@angular/material/fesm2022/divider.mjs
var _MatDivider = class _MatDivider {
  /** Whether the divider is vertically aligned. */
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical = false;
  /** Whether the divider is an inset divider. */
  get inset() {
    return this._inset;
  }
  set inset(value) {
    this._inset = coerceBooleanProperty(value);
  }
  _inset = false;
};
__name(_MatDivider, "MatDivider");
__publicField(_MatDivider, "ɵfac", /* @__PURE__ */ __name(function MatDivider_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatDivider)();
}, "MatDivider_Factory"));
__publicField(_MatDivider, "ɵcmp", ɵɵdefineComponent({
  type: _MatDivider,
  selectors: [["mat-divider"]],
  hostAttrs: ["role", "separator", 1, "mat-divider"],
  hostVars: 7,
  hostBindings: /* @__PURE__ */ __name(function MatDivider_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-orientation", ctx.vertical ? "vertical" : "horizontal");
      ɵɵclassProp("mat-divider-vertical", ctx.vertical)("mat-divider-horizontal", !ctx.vertical)("mat-divider-inset", ctx.inset);
    }
  }, "MatDivider_HostBindings"),
  inputs: {
    vertical: "vertical",
    inset: "inset"
  },
  decls: 0,
  vars: 0,
  template: /* @__PURE__ */ __name(function MatDivider_Template(rf, ctx) {
  }, "MatDivider_Template"),
  styles: [".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}\n"],
  encapsulation: 2,
  changeDetection: 0
}));
var MatDivider = _MatDivider;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDivider, [{
    type: Component,
    args: [{
      selector: "mat-divider",
      host: {
        "role": "separator",
        "[attr.aria-orientation]": 'vertical ? "vertical" : "horizontal"',
        "[class.mat-divider-vertical]": "vertical",
        "[class.mat-divider-horizontal]": "!vertical",
        "[class.mat-divider-inset]": "inset",
        "class": "mat-divider"
      },
      template: "",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline-variant));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}\n"]
    }]
  }], null, {
    vertical: [{
      type: Input
    }],
    inset: [{
      type: Input
    }]
  });
})();
var _MatDividerModule = class _MatDividerModule {
};
__name(_MatDividerModule, "MatDividerModule");
__publicField(_MatDividerModule, "ɵfac", /* @__PURE__ */ __name(function MatDividerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatDividerModule)();
}, "MatDividerModule_Factory"));
__publicField(_MatDividerModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatDividerModule,
  imports: [MatCommonModule, MatDivider],
  exports: [MatDivider, MatCommonModule]
}));
__publicField(_MatDividerModule, "ɵinj", ɵɵdefineInjector({
  imports: [MatCommonModule, MatCommonModule]
}));
var MatDividerModule = _MatDividerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDividerModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatDivider],
      exports: [MatDivider, MatCommonModule]
    }]
  }], null, null);
})();
export {
  MatDivider,
  MatDividerModule
};
//# sourceMappingURL=@angular_material_divider.js.map
