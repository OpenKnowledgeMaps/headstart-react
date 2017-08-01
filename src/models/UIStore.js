import { extendObservable, autorun } from "mobx";
import { scaleLinear } from "d3-scale";
import PapersModel from "./PapersModel";
import BubblesModel from "./BubblesModel";

class UIStore {
  constructor(domainStore, initSize, config) {
    const { papersObject, bubblesObject, areasObject } = domainStore;

    this.config = config;

    this.papersStore = new PapersModel(papersObject);
    this.bubblesStore = new BubblesModel(bubblesObject);
    this.previousSVGSize = initSize - 65;
    this.isZoomed = false;

    extendObservable(this, {
      areas: areasObject,
      progress: 0,
      svgWidth: this.previousSVGSize,
      svgHeight: this.previousSVGSize,
      subtitleHeight: 65,
      paperExplorerHeight: 113,
      paperListHeight:
        this.previousSVGSize + this.subtitleHeight - this.paperExplorerHeight,
      forceSimIsDone: false,
      zoomFactor: 1,
      translationVecX: 0,
      translationVecY: 0,
      searchString: "",
      displayList: true,
      sortOption: null,
      topic: 'cool'
    });

    this.initCoords(this.svgWidth);
  }

  disposer() {
    autorun(() => {
      if (
        this.papersStore.hasSelectedEntities ||
        this.bubblesStore.hasSelectedEntities
      ) {
        this.isZoomed = true;
        let node = this.bubblesStore.selectedEntities;
        if (node.length > 0) {
          this.updateZoomState(node[0], this);
        }
      } else if (
        !(
          this.papersStore.hasSelectedEntities &&
          this.bubblesStore.hasSelectedEntities
        ) &&
        this.isZoomed === true
      ) {
        this.isZoomed = false;
        this.resetZoomState(this);
      }
    });
  }

  updateZoomState(node) {
    this.zoomFactor = this.svgWidth * 0.5 / (node.orig_r*1.3);
    this.translationVecX = this.svgWidth * 0.5 - this.zoomFactor * node.orig_x;
    this.translationVecY = this.svgHeight * 0.5 - this.zoomFactor * node.orig_y;
  }

  resetZoomState() {
    this.zoomFactor = 1;
    this.translationVecX = 0;
    this.translationVecY = 0;
  }

  initCoords(range) {
    const max = Math.max(
      Math.max(...this.papersStore.entities.map(entity => entity.x)),
      Math.max(...this.papersStore.entities.map(entity => entity.y))
    );
    const min = Math.min(
      Math.min(...this.papersStore.entities.map(entity => entity.x)),
      Math.min(...this.papersStore.entities.map(entity => entity.y))
    );
    const maxReaders = Math.max(
      ...this.bubblesStore.entities.map(entity => entity.readers)
    );
    const minReaders = Math.min(
      ...this.bubblesStore.entities.map(entity => entity.readers)
    );
    let scale = scaleLinear().domain([min, max]).range([0, range]);
    let radiusScale = scaleLinear()
      .domain([minReaders, maxReaders])
      .range([range / 11, range / 6]);

    this.papersStore.entities.forEach(entity => {
      entity.x = scale(entity.x);
      entity.y = scale(entity.y);
      entity.meanx = scale(entity.meanx);
      entity.meany = scale(entity.meany);
    });

    this.bubblesStore.entities.forEach(entity => {
      entity.x = scale(entity.x);
      entity.y = scale(entity.y);
      entity.r = radiusScale(entity.readers);
    });
  }

  getChartSize(width) {
    let SVGSize =  width;
    return SVGSize;
  }

  updateChartSize(width, check) {
    if (!check) {
      let newSVGSize = this.getChartSize(width);
      this.previousSVGSize = this.svgWidth;
      this.svgWidth = newSVGSize;
      this.svgHeight = newSVGSize;
      this.paperListHeight = newSVGSize + this.subtitleHeight - this.paperExplorerHeight;
      this.bubblesStore.onWindowResize(this.previousSVGSize, newSVGSize);
      this.papersStore.onWindowResize(this.previousSVGSize, newSVGSize);
    }
  }
}

export default UIStore;
