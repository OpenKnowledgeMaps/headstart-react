import { extendObservable } from "mobx";
import { scaleLinear } from "d3-scale";
import { timer } from 'd3-timer';
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
    this.lock = false;

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

  updateZoomState({orig_r, orig_x, orig_y}, node2) {
    const hasNode2 = (node2 !== undefined);
    const mid = this.svgWidth * 0.5;
    const startx = hasNode2 ? node2.orig_x : mid;
    const starty = hasNode2 ? node2.orig_y : mid;
    const startz = this.zoomFactor;
    const z = mid / (orig_r*1.05);
    const x = orig_x;
    const y = orig_y;
    this.updateZoomStateAnimated(z, x, y, startx, starty, startz);
  }

  updateZoomState2(z, x, y) {
    this.zoomFactor = z;
    this.translationVecX = this.svgWidth * 0.5 - z*x;
    this.translationVecY = this.svgHeight * 0.5 - z*y;
  }

  updateZoomStateAnimated(z, x, y, startx_, starty_, startz_, callback) {
    if(!this.lock) {
      this.lock = true;
      let startz = startz_;
      let startx = startx_;
      let starty = starty_;

      const stepCount = 10;
      const translationStepcount = stepCount;
      const targetz = z;
      const targetx = x;
      const targety = y;
      const incrementz = (targetz - startz)/stepCount;
      const incrementx = (targetx - startx)/translationStepcount;
      const incrementy = (targety - starty)/translationStepcount;
      let t = timer(elapsed => {
        if (
          (Math.abs(targetx - startx) < 0.2) &&
          (Math.abs(targety - starty) < 0.2) &&
          (Math.abs(targetz - startz) < 0.1)
        ) {
          t.stop();
          this.lock = false;
          if (typeof  callback === 'function') callback();
        }
        if (Math.abs(targetz - startz) > 0.1) startz += incrementz;
        if (Math.abs(targety - starty) > 0.1) starty += incrementy;
        if (Math.abs(targetx - startx) > 0.1) startx += incrementx;
        this.updateZoomState2(startz, startx, starty);
      });
    }
  }

  unselectAll() {

  }

  resetZoomState(callback) {
    const mid = this.svgWidth*0.5;
    const zf = this.zoomFactor;
    const nodex = this.bubblesStore.selectedEntities[0].orig_x;
    const nodey = this.bubblesStore.selectedEntities[0].orig_y;
    this.updateZoomStateAnimated(1., mid, mid, nodex, nodey, zf, callback);
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
