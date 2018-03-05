/**
 * Helper function that looks through a listEntry;
 * @param listEntry
 * @param searchString
 * @returns {boolean}
 */
function hasSubstring(listEntry, searchString) {
  let containsSubstring = false;
  const searchStringsLowerCase = searchString.toLowerCase().split(' ');
  // TODO make this configurable or determine in another way, remove hardcoded attributes
  const attributesToLookFor = ['title', 'area', 'authors', 'paper_abstract', 'year'];
  let substringsFoundList = [];

  searchStringsLowerCase.forEach((string) => {
    if (string !=='') {
      let foundInAttributes = false;
      attributesToLookFor.forEach((attribute) => {
        if (listEntry.hasOwnProperty(attribute) && (listEntry[attribute].toLowerCase().includes(string)))
          foundInAttributes = true;
      });
      substringsFoundList.push(foundInAttributes);
    }
  });

  if (substringsFoundList.every((entry) => entry)
    && substringsFoundList.length > 0) {
    containsSubstring = true;
  }

  if (searchString === "") return true;
  return containsSubstring;
}

export {hasSubstring};