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
} from "./chunk-HIZOFEQW.js";
import "./chunk-RKVWB4PT.js";
import {
  MatOptgroup,
  MatOption
} from "./chunk-JD2KIU4T.js";
import "./chunk-7JEK7SQW.js";
import "./chunk-LS3XU4M6.js";
import "./chunk-P3MLSVYA.js";
import "./chunk-TXSXJGUA.js";
import "./chunk-Z3ZTZPTE.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-55LYZL4Q.js";
import "./chunk-HRBUZG3J.js";
import "./chunk-LLTNSC43.js";
import "./chunk-H5BAZBVC.js";
import "./chunk-QMZVVKBR.js";
import "./chunk-GCZGPMYJ.js";
import "./chunk-YYSJGLS6.js";
import "./chunk-3MGPN52P.js";
import "./chunk-EU6LDZPU.js";
import "./chunk-EURNGT5W.js";
import "./chunk-J3HVXLVM.js";
import "./chunk-CR4MILZO.js";
import "./chunk-DRGRLKGG.js";
import "./chunk-MWEPKM45.js";
import "./chunk-SPJVBSJ4.js";
import "./chunk-WGFF3YEZ.js";
import "./chunk-BLVT4R4V.js";
import "./chunk-H3AHVZEA.js";
import "./chunk-UI6KUZ2C.js";
import "./chunk-ZUHKEHKF.js";
import "./chunk-VGY65NYZ.js";
import "./chunk-Z56SSN6E.js";

// node_modules/@angular/material/fesm2022/select.mjs
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
