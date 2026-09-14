import { turnStringIntoObjectArray, turnObjArrayToCssString, changePropsInsideCssChapterArray } from "./komponenter/rådyrCssGrab";

const deerCssStr = `
        /*LEFT EAR INNER BASE*/
        60% 14%,
        /*RIGHT EAR INNER BASE*/
        61.92% 10%,
        63% 8%,
        64% 5.5%,
        64.48% 4.3%,
        64.72% 4.2%,
        /*RIGHT EAR TIP 1*/
        64.72% 4.212%,
        /*RIGHT EAR TIP 2*/
        64.8% 4.65%,
        64.8% 6%,
        64.6% 7.5%,
        63.2% 11.5%,
        /*BASE*/
        60.6% 14%
        /*END*/
`
const cssChapterArr = turnStringIntoObjectArray(deerCssStr);
const changedProps = changePropsInsideCssChapterArray(
  cssChapterArr,
  function(x: number) {
    return x + 2;
  },
  function(y: number) {
    return y;
  }

);

console.log(cssChapterArr);
console.log(deerCssStr + "        !! -- original!! Ikke gjort til objekt");
console.log(turnObjArrayToCssString(changedProps));