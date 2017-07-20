function transformAuthors(authors) {
  return (authors
    .split(';')
    .map((author) => {
      const names = author.split(',');
      return names[1] + ' ' + names[0];
    })
    .reduce((names, name) => names + ', ' + name, '').slice(2));
}

export {transformAuthors};