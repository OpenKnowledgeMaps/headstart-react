function transformAuthors(authors) {
  return (authors
    .split(';')
    .map((author) => {
      const names = author.split(',');
      return names[1] + ' ' + names[0];
    })
    .reduce((names, name) => names + ', ' + name, '').slice(2));
}

function hasSubstring(listEntry, searchString) {
  let containsSubstring = false;
  const searchStringsLowerCase = searchString.toLowerCase().split(' ');
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

export {transformAuthors, hasSubstring};