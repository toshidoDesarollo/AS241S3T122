import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-7LFVMHJ7.js";
import "./chunk-53CKXS4J.js";
import {
  MatOptgroup,
  MatOption
} from "./chunk-QOGHJLMZ.js";
import "./chunk-LML5XS3V.js";
import "./chunk-S7LYLR3W.js";
import "./chunk-OP6THLQ2.js";
import "./chunk-V6RC73ME.js";
import "./chunk-JVFOOFGJ.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-X5M3LSP6.js";
import "./chunk-JTY6O2CD.js";
import "./chunk-7BNJJJUZ.js";
import "./chunk-HBFSH7DZ.js";
import "./chunk-LDKCHQRY.js";
import "./chunk-TWM3VAPV.js";
import "./chunk-KX4FD7ZX.js";
import "./chunk-OSFO2IZ2.js";
import "./chunk-WJSJUZRK.js";
import "./chunk-PEWXOVRB.js";
import "./chunk-3PTKK3AD.js";
import "./chunk-GP3HO4UL.js";
import "./chunk-PNIUEV7Q.js";
import "./chunk-WOXV4ZRX.js";
import "./chunk-NW3TAMJT.js";
import "./chunk-GOHWJG75.js";
import "./chunk-KXAFGDSC.js";
import "./chunk-LTNSATDW.js";
import {
  require_operators
} from "./chunk-UIYHWEA5.js";
import {
  require_cjs
} from "./chunk-TLTLRDLX.js";
import "./chunk-KNCEO2A4.js";
import {
  __toESM
} from "./chunk-XCKGGG5T.js";

// node_modules/@angular/material/fesm2022/select.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
var matSelectAnimations = {
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [
      {
        type: 0,
        name: "void",
        styles: {
          type: 6,
          styles: { opacity: 0, transform: "scale(1, 0.8)" },
          offset: null
        }
      },
      {
        type: 1,
        expr: "void => showing",
        animation: {
          type: 4,
          styles: {
            type: 6,
            styles: { opacity: 1, transform: "scale(1, 1)" },
            offset: null
          },
          timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
        },
        options: null
      },
      {
        type: 1,
        expr: "* => void",
        animation: {
          type: 4,
          styles: { type: 6, styles: { opacity: 0 }, offset: null },
          timings: "100ms linear"
        },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
