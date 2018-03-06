import { extendObservable } from "mobx";
import { scaleLinear } from "d3-scale";
import { timer } from 'd3-timer';
import { easePolyInOut } from 'd3-ease';
import PapersModel from "./PapersModel";
import BubblesModel from "./BubblesModel";

/**
 * The UI Store
 * The UI Store is the single source of truth for the state of the UI.
 */
class UIStore {
  /**
   * Initializes the UIStore with the papers, bubbles and areas Object as determined by a DomainStore instance
   * and according to a configuration config;
   * @param domainStore - A domainStore instance
   * @param config - A configuration
   * @param initWidth - The initial size to which the Visualization should be initialized
   */
  constructor(domainStore, config, initWidth = 900, initHeight = 900) {
    const { papersObject, bubblesObject, areasObject } = domainStore;

    this.config = config;

    this.papersStore = new PapersModel(papersObject);
    this.bubblesStore = new BubblesModel(bubblesObject);
    this.previousSVGSize = Math.min(initWidth, initHeight);
    this.isZoomed = false;
    this.lock = false;

    // extendObservable tells MobX that these members of UIStore are observable.
    // When an observable is changed, all observers are updated automatically.
    extendObservable(this, {
      areas: areasObject,
      progress: 0,
      svgWidth: initWidth,
      svgHeight: initHeight - 65,
      subtitleHeight: 65,
      paperExplorerHeight: 113,
      paperListHeight:
        initHeight - this.paperExplorerHeight,
      forceSimIsDone: false,
      zoomFactor: 1,
      translationVecX: 0,
      translationVecY: 0,
      searchString: "",
      displayList: true,
      sortOption: null,
      topic: 'cool'
    });
    console.log("DEBUG UIStore svgWidth", this.svgWidth, this.svgHeight);
    this.initCoords(this.previousSVGSize);
  }

  /**
   * Get start coords and target coords for a zoom transition
   * and call updateZoomStateAnimated to carry out the transition;
   * @param orig_r - the original radius of the target bubble;
   * @param orig_x - the original x coord of the target bubble;
   * @param orig_y - the original y coord of the target bubble;
   * @param node2 - the starting node of the zoom animation;
   */
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

  /**
   * Directly set zoom state to desired midpoint and zoomfactor;
   * @param z - the zoom factor
   * @param x - the desired x coordinate
   * @param y - the desired y coordinate
   */
  updateZoomState2(z, x, y) {
    this.translationVecX = this.svgWidth * 0.5 - z*x;
    this.translationVecY = this.svgHeight * 0.5 - z*y;
    this.zoomFactor = z;
  }

  /**
   * Carries out the transition from state points
   * startx_, start_y, startz_ to z, x, y.
   * Uses d3-timer to update the state in an animated fashion.
   * The configured zoomDuration determines the duration of the transition,
   * during which easeFactor goes from 0 to 1 and the state point consequently from its
   * start values to its end values.
   * @param z - The desired zoom factor;
   * @param x - The x coordinate of the desired bubble;
   * @param y - The y coordinate of the desired bubble;
   * @param startx_- The starting x coordinate;
   * @param starty_- The starting y coordinate;
   * @param startz_- The starting zoom factor;
   * @param callback - A callback function;
   */
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


  /**
   * Returns the visualization to the original 'zoomed-out' state;
   * @param callback - A callback function;
   * @param node - The node which is currently centered and zoomed in;
   */
  resetZoomState(callback, node) {
    const mid = this.svgWidth*0.5;
    const zf = this.zoomFactor;
    const nodex = node.orig_x;
    const nodey = node.orig_y;
    this.updateZoomStateAnimated(1., mid, mid, nodex, nodey, zf, callback);
  }

  /**
   * Determines the maximal and minimal coordinates (as determined by the backend)
   * and maps them to a range;
   * Maps the bubble radius to the relative amount of total reader count of the papers in a bubble.
   * @param range - The range on which coordinate calculations should be based on.
   */
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

    //TODO radiusScale range should be configurable (extract magic numbers 11 & 6)
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

  /**
   * Gets window dimensions and updates Chart accordingly
   */
  updateDimensions() {
    const headstartContainer = window.document.querySelector(".vis-col");
    const newSize = headstartContainer.clientWidth;
    this.paperExplorerHeight = window.document.querySelector("#explorer_header").clientHeight;
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.paperListHeight = h - this.paperExplorerHeight;
    this.updateChartSize(newSize, newSize);
  }

  /**
   * Takes a width and adjusts coordinates of bubbles/papers and size of svg accordingly
   * @param width - The desired visualization width
   * @param height - The desired visualiztion height
   * @param check
   */
  updateChartSize(width, height) {
    let newSVGSize = Math.min(width,height);
    this.previousSVGSize = this.svgWidth;
    const prevX = this.svgHeight*0.5;
    const prevY = this.svgHeight*0.5;
    this.svgWidth = width;
    this.svgHeight = height;
    const midX = this.svgHeight * 0.5;
    const midY = this.svgHeight * 0.5;
    this.translationVecX *= midX/prevX;
    this.translationVecY *= midY/prevY;
    this.bubblesStore.onWindowResize(this.previousSVGSize, newSVGSize);
    this.papersStore.onWindowResize(this.previousSVGSize, newSVGSize);
    console.log("DEBUG updateChartSize ", width, height)
  }
}

export default UIStore;
