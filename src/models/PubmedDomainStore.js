import DomainStore from './DomainStore';

/**
 * The Pubmed DomainStore
 * Implementations of DomainStore prepare
 * 3 Objects for UIStore, starting from a backend payload
 */
class PubmedDomainStore extends DomainStore {
  transformAuthors(authors) {
    const auth = (authors
      .split(';')
      .map(
        (author) => {
          const names = author.split(',');
          return names[1] + ' ' + names[0];
      })
      .reduce((names, name) => names + ', ' + name, '').slice(2));
    return auth;
  }

  populateObjects() {

    let id = 0;
    this.payload.forEach((entry) => {

      if(!this.bubblesObject
          .some((bubble) => bubble.area === entry.area)) {
        this.bubblesObject.push({area: entry.area, area_uri: entry.area_uri[0], x: 0., y: 0., readers : 0, id: id});
        id++;
      }

      if(!this.areasObject.includes(entry.area)) this.areasObject.push(entry.area);

      let bubble = this.bubblesObject.find((bubble) => bubble.area === entry.area);
      bubble.x += entry.x[0];
      bubble.y += entry.y[0];
      bubble.readers += parseInt(entry.readers, 10);

    });

    this.bubblesObject.forEach((bubble) => {
      bubble.x /= this.payload.filter((entry) => entry.area === bubble.area).length;
      bubble.y /= this.payload.filter((entry) => entry.area === bubble.area).length;
      bubble.r = bubble.readers;
    });

    id = 0;
    this.payload.forEach((entry) => {
      let bubble = this.bubblesObject.find((bubble) => bubble.area === entry.area);
      this.papersObject.push(
        {
          id: id,
          title: entry.title,
          area: entry.area,
          authors: this.transformAuthors(entry.authors),
          published_in: entry.published_in,
          paper_abstract: entry.paper_abstract,
          year: entry.year,
          x: entry.x[0],
          y: entry.y[0],
          meanx: bubble.x,
          meany: bubble.y,
          oa: !(entry.pmcid === ''),
          oa_link: "https://www.ncbi.nlm.nih.gov/pmc/articles/" + entry.pmcid,
          oa_link_pdf: !(entry.pmcid === '') ? "https://www.ncbi.nlm.nih.gov/pmc/articles/" + entry.pmcid + "/pdf/" : '',
          readers: parseInt(entry.readers, 10)
        });
      id++;
    });
  }
}

export default PubmedDomainStore;