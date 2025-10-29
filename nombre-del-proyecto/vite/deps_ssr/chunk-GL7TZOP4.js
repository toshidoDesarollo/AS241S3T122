import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatTooltip,
  TooltipComponent
} from "./chunk-VYVO7AYO.js";
import {
  OverlayModule
} from "./chunk-LML5XS3V.js";
import {
  CdkScrollableModule
} from "./chunk-7BNJJJUZ.js";
import {
  A11yModule,
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
//# sourceMappingURL=chunk-GL7TZOP4.js.map
