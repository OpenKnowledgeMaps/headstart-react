import { extendObservable } from "mobx";
import { scaleLinear } from "d3-scale";
import { timer } from 'd3-timer';
import { easePolyInOut } from 'd3-ease';
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
    this.translationVecX = this.svgWidth * 0.5 - z*x;
    this.translationVecY = this.svgHeight * 0.5 - z*y;
    this.zoomFactor = z;
  }

  updateZoomStateAnimated(z, x, y, startx_, starty_, startz_, callback) {
    const midx = this.svgWidth*0.5;
    const midy = this.svgHeight*0.5;

    const duration = this.config.zoomDuration;
    let ratio = 0.;
    let t = timer(elapsed => {
      ratio = (elapsed/duration) > 1 ? 1. : elapsed/duration;
      const easeFactor = easePolyInOut(ratio, 1.2);
      const newz = (1 - easeFactor)*startz_ + easeFactor*z;
      const newy = (1 - easeFactor)*starty_ + easeFactor*y;
      const newx = (1 - easeFactor)*startx_ + easeFactor*x;

      this.translationVecX = midx - newz*newx;
      this.translationVecY = midy - newz*newy;
      this.zoomFactor = newz;
      // this.updateZoomState2(startz, startx, starty);

      if ( elapsed > duration ) {
        t.stop();
        if (typeof  callback === 'function') callback();
      }
    });
  }

  resetZoomState(callback, node) {
    const mid = this.svgWidth*0.5;
    const zf = this.zoomFactor;
    const nodex = node.orig_x;
    const nodey = node.orig_y;
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
      const prevX = this.svgWidth*0.5;
      const prevY = this.svgHeight*0.5;
      this.svgWidth = newSVGSize;
      this.svgHeight = newSVGSize;
      const midX = this.svgWidth * 0.5;
      const midY = this.svgHeight * 0.5;
      this.translationVecX *= midX/prevX;
      this.translationVecY *= midY/prevY;
      this.paperListHeight = newSVGSize + this.subtitleHeight - this.paperExplorerHeight;
      this.bubblesStore.onWindowResize(this.previousSVGSize, newSVGSize);
      this.papersStore.onWindowResize(this.previousSVGSize, newSVGSize);
    }
  }

  // updateTranslationVectors()
}

export default UIStore;
