const deerStr = `
        /*SHOULDER*/
        calc(var(--wW) + (var(--h) * 0.015)) 50%,
        /*HEART*/
        calc(var(--wW) + (var(--h) * 0.15)) 50%,
        calc(var(--wW) + (var(--h) * 0.135)) 55%,
        calc(var(--wW) + (var(--h) * 0.105)) 57.5%,

        /*FALSE ELBOW FRONT*/
        calc(var(--wW) + (var(--h) * 0.115)) 75%,
        /*FOOT*/
        calc(var(--wW) - (var(--h) * 0.052)) 94%,
        calc(var(--wW) - (var(--h) * 0.063)) 92%,
        calc(var(--wW) - (var(--h) * 0.05)) 88%,

        /*FALSE ELBOW FRONT*/
        calc(var(--wW) + (var(--h) * 0.072)) 75%
`;

const coorsToChange = deerStr
  .split(",")
  .map(coordinateStr => {
    return coordinateStr
      .substring(coordinateStr.indexOf("calc"))
      .split("")
      .reverse()
      .join("");
  })
  .map(reversedStr => {
    return reversedStr
      .substring(reversedStr.indexOf(" "))
      .split("")
      .reverse()
      .join("").trim()
  });

document.getElementsByTagName("p")[0].innerHTML =
  deerStr
    .split(",")
    .map((coordinateStr,i) => {
      return coordinateStr
        .replace(
          coorsToChange[i],
            shorten( 
              grabCoor(coorsToChange[i]),
              coordinateStr
                .split("")
                .includes("+")
            ) + "%"
        );
    })
    .join(",<br>").replaceAll("NaN%", "50%")
    /* THIS ONE ^ */
  +
  "<hr>"
  +
  deerStr
    .split(",")
    .map((coordinateStr,i) => {
      return coordinateStr
        .replace(
          coorsToChange[i],
          grabCoor(coorsToChange[i])
        );
    })
    .join(",<br>");

function shorten(coor, boo) {
  const newCoor = 50 - (( 40 * coor ) * (boo ? -1 : 1)) + "";
  if (newCoor.substring(newCoor.indexOf(".") + 1).length > 3)
      return newCoor.substring(0, newCoor.indexOf(".") + 5)
      else return newCoor;
}

function grabCoor(coorStr) {
  return parseFloat(coorStr
    .substring(coorStr.indexOf(" * ") + 3, coorStr.indexOf("))"))
    .trim());
}
