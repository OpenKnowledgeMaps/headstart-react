import { action } from 'mobx';

function clearSelection() {
  if(document.selection && document.selection.empty) {
    document.selection.empty();
  } else if(window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
  }
}

/**
 * Checks whether a clicked Bubble should be zoomed in on.
 * If yes, update state.
 * @param store - The UI store
 * @param node - The clicked Bubble
 */
function onBubbleClick(store, node) {
  console.log("DEBUG onBubbleClick");
  store.animationLock = true;
  if (store.forceSimIsDone && !node.selected) {
    let prevNode = store.bubblesStore.selectedEntities[0];
    store.updateZoomState(node, prevNode, () => {
      store.isZoomed = true;
      store.bubblesStore.selectedArea = node.area;
      store.papersStore.selectedArea = node.area;
      store.papersStore.clickedEntity = null;
      store.bubblesStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 4);
      store.papersStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 5);
    });
  }
}

const resetBubblesAndPapers = action((store) => {
  let {bubblesStore, papersStore, forceSimIsDone} = store;
  // store.isZoomed = false;
  bubblesStore.selectedArea = null;
  papersStore.selectedArea = null;
  papersStore.listVisiblePapers = store.papersStore.entities;
  // papersStore.clickedEntity = null;
});

/**
 * Checks whether a double clicked Bubble should
 * trigger zooming out; If yes, sets bubble/paper flags &
 * resets zoom state
 * @param store - The UI Store
 * @param node - The double clicked bubble
 */
const onBubbleDoubleClick = (store, node) => (event)  =>
{
  // event.preventDefault();
  // console.log(event);
  console.log("onBubbleDoubleClick");
  resetBubblesAndPapers(store);
  clearSelection();
  setTimeout(() => {
    store.resetZoomState(() => {
    }, node)
  },50);
  // if (store.forceSimIsDone && store.isZoomed) {
  //     store.bubblesStore.selectedArea = null;
  //     store.papersStore.selectedArea = null;
  //     store.papersStore.listVisiblePapers = store.papersStore.entities;
  // }
};

/**
 * Modifies state according to which bubble/paper the user hovers over;
 * @param store - The UI store
 * @param node - The hovered over bubble
 */
const onBubbleMouseEnter = action((store, node) => {
  if (!store.animationLock) {
    store.bubblesStore.hoveredEntity = node;
    store.papersStore.hoveredEntity = null;
    if (!store.bubblesStore.hasSelectedEntities) {
      store.bubblesStore.activeArea = node.area;
      store.papersStore.activeArea = node.area;
      store.papersStore.entitiesOutsideArea(node.area).forEach((entity) => entity.zIndex = 0);
      store.bubblesStore.entitiesOutsideArea(node.area).forEach((entity) => entity.zIndex = 1);
      store.bubblesStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 2);
      store.papersStore.entitiesInArea(node.area).forEach((entity) => entity.zIndex = 3);
    }
  // }
  }
});

/**
 * Resets the hoveredEntity flag
 * @param store - The UI Store
 */
function onBubbleMouseLeave(store) {
  if (store.forceSimIsDone && !store.animationLock && !store.bubblesStore.hasSelectedEntities) {
    store.bubblesStore.hoveredEntity = null;
  }
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick};