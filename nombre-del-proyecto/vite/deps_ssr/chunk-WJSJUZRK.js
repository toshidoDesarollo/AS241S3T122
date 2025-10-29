import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MediaMatcher
} from "./chunk-GP3HO4UL.js";
import {
  ANIMATION_MODULE_TYPE,
  InjectionToken,
  NgModule,
  inject,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-LTNSATDW.js";
import {
  require_operators
} from "./chunk-UIYHWEA5.js";
import {
  require_cjs
} from "./chunk-TLTLRDLX.js";
import {
  __name,
  __publicField,
  __toESM
} from "./chunk-XCKGGG5T.js";

// node_modules/@angular/cdk/fesm2022/layout.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var _LayoutModule = class _LayoutModule {
};
__name(_LayoutModule, "LayoutModule");
__publicField(_LayoutModule, "ɵfac", /* @__PURE__ */ __name(function LayoutModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LayoutModule)();
}, "LayoutModule_Factory"));
__publicField(_LayoutModule, "ɵmod", ɵɵdefineNgModule({
  type: _LayoutModule
}));
__publicField(_LayoutModule, "ɵinj", ɵɵdefineInjector({}));
var LayoutModule = _LayoutModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/animation.mjs
var MATERIAL_ANIMATIONS = new InjectionToken("MATERIAL_ANIMATIONS");
var _AnimationCurves = class _AnimationCurves {
};
__name(_AnimationCurves, "AnimationCurves");
__publicField(_AnimationCurves, "STANDARD_CURVE", "cubic-bezier(0.4,0.0,0.2,1)");
__publicField(_AnimationCurves, "DECELERATION_CURVE", "cubic-bezier(0.0,0.0,0.2,1)");
__publicField(_AnimationCurves, "ACCELERATION_CURVE", "cubic-bezier(0.4,0.0,1,1)");
__publicField(_AnimationCurves, "SHARP_CURVE", "cubic-bezier(0.4,0.0,0.6,1)");
var AnimationCurves = _AnimationCurves;
var _AnimationDurations = class _AnimationDurations {
};
__name(_AnimationDurations, "AnimationDurations");
__publicField(_AnimationDurations, "COMPLEX", "375ms");
__publicField(_AnimationDurations, "ENTERING", "225ms");
__publicField(_AnimationDurations, "EXITING", "195ms");
var AnimationDurations = _AnimationDurations;
var reducedMotion = null;
function _getAnimationsState() {
  if (inject(MATERIAL_ANIMATIONS, { optional: true })?.animationsDisabled || inject(ANIMATION_MODULE_TYPE, { optional: true }) === "NoopAnimations") {
    return "di-disabled";
  }
  reducedMotion ??= inject(MediaMatcher).matchMedia("(prefers-reduced-motion)").matches;
  return reducedMotion ? "reduced-motion" : "enabled";
}
__name(_getAnimationsState, "_getAnimationsState");
function _animationsDisabled() {
  return _getAnimationsState() !== "enabled";
}
__name(_animationsDisabled, "_animationsDisabled");

export {
  MATERIAL_ANIMATIONS,
  AnimationCurves,
  AnimationDurations,
  _getAnimationsState,
  _animationsDisabled
};
//# sourceMappingURL=chunk-WJSJUZRK.js.map
