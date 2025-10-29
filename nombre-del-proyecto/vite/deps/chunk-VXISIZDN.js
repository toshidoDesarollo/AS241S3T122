import {
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  TooltipComponent
} from "./chunk-ETXY6OV7.js";
import {
  OverlayModule
} from "./chunk-7JEK7SQW.js";
import {
  CdkScrollableModule
} from "./chunk-LLTNSC43.js";
import {
  A11yModule,
  MatCommonModule
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

// node_modules/@angular/material/fesm2022/tooltip-module.mjs
var _MatTooltipModule = class _MatTooltipModule {
};
__name(_MatTooltipModule, "MatTooltipModule");
__publicField(_MatTooltipModule, "ɵfac", /* @__PURE__ */ __name(function MatTooltipModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MatTooltipModule)();
}, "MatTooltipModule_Factory"));
__publicField(_MatTooltipModule, "ɵmod", ɵɵdefineNgModule({
  type: _MatTooltipModule,
  imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
  exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule]
}));
__publicField(_MatTooltipModule, "ɵinj", ɵɵdefineInjector({
  providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
  imports: [A11yModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule]
}));
var MatTooltipModule = _MatTooltipModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

export {
  MatTooltipModule
};
//# sourceMappingURL=chunk-VXISIZDN.js.map
