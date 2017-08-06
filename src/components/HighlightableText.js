import React from 'react';
import { observer } from 'mobx-react';

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
  let returnString = [];
  let lastIndex = 0;
  indices.forEach((index) => {
    if (index[0] >= lastIndex) {
      returnString.push([value.slice(lastIndex, index[0]), false]);
      returnString.push([value.slice(index[0], index[1]), true]);
      lastIndex = index[1];
    }
  });
  if (lastIndex < value.length) returnString.push([value.slice(lastIndex, value.length), false]);
  return returnString;
}

const HighlightableText =
  observer(
    ({highlightStrings, value}) =>{
      const stringList = highlightPartsOfString(highlightStrings, value);
      return <span>{stringList.map((entry, index) => {
        return entry[1] ? <span key={index} style={{backgroundColor: 'yellow'}}>{entry[0]}</span> : entry[0]
      })}</span>
    });

export default HighlightableText;