// TODO integrate transport layer to get data from backend

class DomainStore {
  constructor(payload) {
    this.payload = payload;
    this.bubblesObject = [];
    this.papersObject = [];
    this.areasObject = [];
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
  }
}

export default DomainStore;