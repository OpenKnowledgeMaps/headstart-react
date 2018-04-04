import React from 'react';
import { observer } from 'mobx-react';

/**
 * Looks for substrings in string value that match elements of
 * highlightStrings;
 * Returns an Array of substrings of value and whether they should be highlighted.
 * @param highlightStrings - list of strings to be looked for
 * @param value - string that should be searched
 * @returns {Array}
 */
function highlightPartsOfString(highlightStrings, value) {
  let indices = [];
  const value_ = value.toLowerCase();
  highlightStrings.forEach((string) => {
    string = string.toLowerCase();
    if (string !== '' && value_.includes(string)) {
      const startIndex = value_.indexOf(string);
      const endIndex = startIndex + string.length;
      indices.push([startIndex, endIndex]);
    }
  });
  let stringList = [];
  let lastIndex = 0;
  indices.forEach((index) => {
    if (index[0] >= lastIndex) {
      stringList.push([value.slice(lastIndex, index[0]), false]);
      stringList.push([value.slice(index[0], index[1]), true]);
      lastIndex = index[1];
    }
  });
  if (lastIndex < value.length) stringList.push([value.slice(lastIndex, value.length), false]);
  return stringList;
}

/**
 * Renders a string and highlights substrings that match a list of strings;
 * @param {string} value - The string to be highlighted and rendered
 * @param {Array} highlightStrings - An array of strings. For each string in this Array matching substrings are found
 * in param value and highlighted
 * @type {<T extends IReactComponent>(clazz: T) => void | IReactComponent | (function({highlightStrings?: *, value?: *}))}
 */
const HighlightableText =
  observer(
    ({highlightStrings, value}) =>{
      const stringList = highlightPartsOfString(highlightStrings, value);
      return <span>{stringList.map((entry, index) => {
        return entry[1] ? <span key={index} style={{backgroundColor: 'yellow'}}>{entry[0]}</span> : entry[0]
      })}</span>
    });

export default HighlightableText;