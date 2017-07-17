import { extendObservable, autorun } from "mobx";
import {scaleLinear} from 'd3-scale';
import PapersModel from './PapersModel';
import BubblesModel from './BubblesModel';

class UIStore {
  constructor(domainStore) {
    let papersStore = new PapersModel(domainStore.papersObject);
    let bubblesStore = new BubblesModel(domainStore.bubblesObject);
    this.isZoomed = false;
    this.papersStore = papersStore;
    this.bubblesStore = bubblesStore;

    this.minimalSVGSize = 700;
    this.minimalListSize = 300;
    const chartSize = this.getChartSize(window.innerHeight, window.innerWidth);
    this.previousSVGSize = chartSize.SVGSize;
    this.previousListSize = chartSize.listSize;

    extendObservable(this, {
      data : { areas: domainStore.areasObject },
      svgWidth: this.previousSVGSize,
      svgHeight: this.previousSVGSize,
      listWidth: this.previousListSize,
      forceSimParameters: {
        manyBodyForceStrength: 1000,
        collisionForceRadius: 120,
        bubblesAlphaMin: 0.8,
        papersAlphaMin: 0.8,
        centerXForceStrength: 0.5,
        centerYForceStrength: 0.5,
      },
      paperZoomFactor: 3.,
      bubbleCenterOffset: 20,
      paperWidth: 26,
      paperHeight: 40,
      forceSimIsDone: false,
      zoomFactor: 1.,
      translationVecX: 0.,
      translationVecY: 0.,
      searchString: "",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      displayList: true
    });
    this.initCoords(this.svgWidth);

  }

    disposer()
    {
      autorun(() => {
        if ((this.papersStore.hasSelectedEntities ||
            this.bubblesStore.hasSelectedEntities)) {

          this.isZoomed = true;
          let node = this.bubblesStore.selectedEntities;
          if (node.length > 0) {
            this.updateZoomState(node[0], this);
            this.updateCoords();
          }

        } else if (!(this.papersStore.hasSelectedEntities && this.bubblesStore.hasSelectedEntities)
            && this.isZoomed === true) {

          this.isZoomed = false;
          this.resetZoomState(this);
          this.updateCoords();

        }
      });
    }

  updateZoomState(node) {
    this.zoomFactor = this.svgWidth * 0.5 / node.orig_r;
    this.translationVecX = this.svgWidth * 0.5 - this.zoomFactor * node.orig_x;
    this.translationVecY = this.svgHeight * 0.5 - this.zoomFactor * node.orig_y;
  }

  updateCoords() {
    const zoomFactor = this.zoomFactor;
    const translationVecX = this.translationVecX;
    const translationVecY = this.translationVecY;

    this.papersStore.entities.forEach((paper) => {
      paper.x = (zoomFactor*paper.orig_x + translationVecX);
      paper.y = (zoomFactor*paper.orig_y + translationVecY);
      paper.width =  zoomFactor*paper.orig_width;
      paper.height =  zoomFactor*paper.orig_height;
      paper.fontsize = zoomFactor*paper.orig_fontsize;
    });

    this.bubblesStore.entities.forEach((node) => {
      node.x = (this.zoomFactor*node.orig_x + this.translationVecX);
      node.y = (this.zoomFactor*node.orig_y + this.translationVecY);
      node.r = (this.zoomFactor*node.orig_r);
    });
  }

  resetZoomState() {
    this.zoomFactor = 1.;
    this.translationVecX = 0.;
    this.translationVecY = 0.;
  }


  initCoords(range) {
    const max = Math.max(
      Math.max(...this.papersStore.entities.map((entity) => entity.x)),
      Math.max(...this.papersStore.entities.map((entity) => entity.y)));
    const min = Math.min(
      Math.min(...this.papersStore.entities.map((entity) => entity.x)),
      Math.min(...this.papersStore.entities.map((entity) => entity.y)));
    const maxReaders = Math.max(...this.bubblesStore.entities.map((entity) => entity.readers));
    const minReaders = Math.min(...this.bubblesStore.entities.map((entity) => entity.readers));
    let scale = scaleLinear().domain([min, max]).range([0, range]);
    let radiusScale = scaleLinear().domain([minReaders, maxReaders]).range([range/10., range/6.]);

    this.papersStore.entities.forEach((entity) => {
      entity.x = scale(entity.x);
      entity.y = scale(entity.y);
      entity.meanx = scale(entity.meanx);
      entity.meany = scale(entity.meany);
    });

    this.bubblesStore.entities.forEach((entity) => {
      entity.x = scale(entity.x);
      entity.y = scale(entity.y);
      entity.r = radiusScale(entity.readers);
    });
  }
  
  getChartSize(height, width) {
    let SVGSize = (width*0.7 > height) ? height : width*0.7;
    if (SVGSize < this.minimalSVGSize) {
      SVGSize = this.minimalSVGSize;
    }
    let listSize = (width - SVGSize)*0.9;
    return {SVGSize: SVGSize, listSize: listSize}
  }
  
  updateChartSize(height, width) {
    let {SVGSize: newSVGSize, listSize: newListSize} = this.getChartSize(height, width);
    this.displayList = (newListSize < this.minimalListSize) ? false : true;

    this.previousSVGSize = this.svgWidth;
    this.previousListSize = this.listWidth;
    this.svgWidth = newSVGSize;
    this.svgHeight = newSVGSize;
    this.listWidth = newListSize;
    this.bubblesStore.onWindowResize(this.previousSVGSize, newSVGSize);
    this.papersStore.onWindowResize(this.previousSVGSize, newSVGSize);
    this.updateCoords();
  }

}

export default UIStore;
