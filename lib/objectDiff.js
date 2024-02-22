import capitalizeFirstLetter from "@/lib/capitalizeFirstLetter";
import isEmptyObject from "@/lib/isEmptyObject";

function objectDiff(baseObj, dataObj) {
  const diffObj = {};

  Object.keys(baseObj)
    .filter((key) => baseObj[key] !== dataObj[key])
    .map(
      (key) =>
        (diffObj["new".concat(capitalizeFirstLetter(key))] = dataObj[key]),
    );

  return isEmptyObject(diffObj) ? null : diffObj;
}

export default objectDiff;
