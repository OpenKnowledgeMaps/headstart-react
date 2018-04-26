import { action } from 'mobx';
import { resetBubblesAndPapers } from "./BubbleEvents";

/**
 * If vis is in zoomed-in state, zooms out and resets all flags;
 * @param store - The UI Store;
 */
function onSVGClick(store) {
  if (store.isZoomed
    && !store.papersStore.hasHoverEntities
    && !store.bubblesStore.hasHoverEntities) {
    store.papersStore.entities.forEach((entity) => entity.zIndex = 1);
    store.bubblesStore.entities.forEach((entity) => entity.zIndex = 2);
    resetBubblesAndPapers(store);
    setTimeout(() => {
      store.resetZoomState(() => {
      })
    },50);
  }
}

const resetZIndices = action(({bubblesStore, papersStore}) => {
  bubblesStore.entities.filter((bubble) => bubble.zIndex !== 1).forEach((bubble) => bubble.zIndex = 1);
  papersStore.entities.filter((paper) => paper.zIndex !== 0).forEach((paper) => paper.zIndex = 0);
});

/**
 * Resets active Flags on papersStore and bubblsStore
 * @param bubblesStore - The bubblesStore
 * @param papersStore - The papersStore
 * @param forceSimIsDone - The UI Store's forceSimIsDone flag
 */
function onSVGMouseOver(store) {
  const { bubblesStore, papersStore, forceSimIsDone } = store;
  if (!papersStore.hasHoverEntities &&
      !bubblesStore.hasHoverEntities &&
      !store.isZoomed &&
      forceSimIsDone ) {
    resetZIndices(store);
    papersStore.activeArea = null;
    bubblesStore.activeArea = null;
  }
}

export {onSVGClick, onSVGMouseOver, resetZIndices};