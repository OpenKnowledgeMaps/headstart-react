import { extendObservable, autorun } from "mobx";
import { scaleLinear } from "d3-scale";
import {timer} from 'd3-timer';
import PapersModel from "./PapersModel";
import BubblesModel from "./BubblesModel";

class UIStore {
  constructor(domainStore, initSize, config) {
    const { papersObject, bubblesObject, areasObject } = domainStore;

    this.config = config;

    // this.papersStore = new PapersModel(papersObject);
    // this.bubblesStore = new BubblesModel(bubblesObject);
    this.previousSVGSize = initSize - 65;
    this.isZoomed = false;

    extendObservable(this, {
      papersStore : new PapersModel(papersObject),
      bubblesStore : new BubblesModel(bubblesObject),
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
          // this.updateCoords();
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
        this.updateCoords();
      }
    });
  }

  updateZoomState(node) {
    const {orig_x, orig_y, orig_r} = node;
    const {svgWidth, svgHeight} = this;
    const midpointX = svgWidth * 0.5;
    const midpointY = svgHeight * 0.5;
    const targetZoomFactor = midpointX / orig_r;
    const targetTranslationVecX = midpointX - targetZoomFactor*orig_x;
    const targetTranslationVecY = midpointY - targetZoomFactor*orig_y;
      let timeout = timer(() => {
        if (
          (this.zoomFactor >= targetZoomFactor) &&
          (Math.abs(targetTranslationVecX - this.translationVecX) < 30) &&
          (Math.abs(targetTranslationVecY - this.translationVecY) < 30)
        ) timeout.stop();
        if (this.zoomFactor < targetZoomFactor) this.zoomFactor += 0.1;
        const vx = (midpointX - targetZoomFactor*orig_x);
        const vy = (midpointY - targetZoomFactor*orig_y);
        const tnX = vx/Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
        const tnY = vy/Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
        this.translationVecX = midpointX - this.zoomFactor*orig_x;
        this.translationVecY = midpointY - this.zoomFactor*orig_y;
        console.log(this.translationVecX, targetTranslationVecX);
        // this.updateCoords();
    })
  }

  // updateCoords() {
  //   const zoomFactor = this.zoomFactor;
  //   const translationVecX = this.translationVecX;
  //   const translationVecY = this.translationVecY;
  //
  //   // this.papersStore.entities.forEach(paper => {
  //   //   paper.x = zoomFactor * paper.orig_x + translationVecX;
  //   //   paper.y = zoomFactor * paper.orig_y + translationVecY;
  //   //   paper.width = zoomFactor * paper.orig_width;
  //   //   paper.height = zoomFactor * paper.orig_height;
  //   //   paper.fontsize = zoomFactor * paper.orig_fontsize;
  //   // });
  //   // for(let i = 0; i < this.papersStore.entities.length; i ++) {
  //   //   this.papersStore.entities[i].x = zoomFactor * this.papersStore.entities[i].orig_x + translationVecX;
  //   //   this.papersStore.entities[i].y = zoomFactor * this.papersStore.entities[i].orig_y + translationVecY;
  //   //   // this.papersStore.entities[i].width = zoomFactor * this.papersStore.entities[i].orig_width;
  //   //   // this.papersStore.entities[i].height = zoomFactor * this.papersStore.entities[i].orig_height;
  //   //   // this.papersStore.entities[i].fontsize = zoomFactor * this.papersStore.entities[i].orig_fontsize;
  //   // }
  //
  //   // for(let i = 0; i < this.bubblesStore.entities.length; i++) {
  //   //   this.bubblesStore.entities[i].x = this.zoomFactor * this.bubblesStore.entities[i].orig_x + this.translationVecX;
  //   //   this.bubblesStore.entities[i].y = this.zoomFactor * this.bubblesStore.entities[i].orig_y + this.translationVecY;
  //   //   this.bubblesStore.entities[i].r = this.zoomFactor * this.bubblesStore.entities[i].orig_r;
  //   // }
  //
  //   // this.bubblesStore.entities.forEach(node => {
  //   //   node.x = this.zoomFactor * node.orig_x + this.translationVecX;
  //   //   node.y = this.zoomFactor * node.orig_y + this.translationVecY;
  //   //   node.r = this.zoomFactor * node.orig_r;
  //   // });
  // }

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
    let SVGSize =
      (window.innerHeight - 75 < width ? window.innerHeight - 75 : width);
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
      // this.updateCoords();
    }
  }
}

export default UIStore;
