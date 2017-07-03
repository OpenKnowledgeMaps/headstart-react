/**
 * Created by rbachleitner on 6/26/17.
 */

function onBubbleClick(store, node) {
  if (store.forceSimIsDone) {
    store.nodesStore.selectedArea = node.area;
    store.papersStore.selectedArea = node.area;
    store.papersStore.clickedPaper = null;
  }
}

function onBubbleDoubleClick(store, node)
{
  if (store.forceSimIsDone) {
    store.nodesStore.selectedArea = null;
    store.papersStore.selectedArea = null;
    store.papersStore.listVisiblePapers = store.papersStore.papers;
  }
}

function onBubbleMouseEnter(store, node) {
  if (store.forceSimIsDone) {
    store.nodesStore.hoveredEntity = node;
    store.papersStore.hoveredPaper = null;
    if (!store.nodesStore.hasSelectedEntities) {
      store.nodesStore.activeArea = node.area;
      store.papersStore.activeArea = node.area;
    }
  }
}

function onBubbleMouseLeave(store) {
  if (store.forceSimIsDone) {
    store.nodesStore.hoveredEntity = null;
  }
}

export {onBubbleClick, onBubbleMouseEnter, onBubbleMouseLeave, onBubbleDoubleClick};