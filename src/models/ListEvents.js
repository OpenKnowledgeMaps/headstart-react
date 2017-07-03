/**
 * Created by rbachleitner on 6/27/17.
 */
import uiStore from './UIStore';

function onListClick(paper) {
  uiStore.papersStore.clickedPaper = paper;
  uiStore.papersStore.selectedArea = paper.area;
  uiStore.nodesStore.selectedArea = paper.area;
}

export {onListClick};
