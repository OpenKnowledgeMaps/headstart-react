/**
 * Created by rbachleitner on 6/27/17.
 */
import uiStore from './UIStore';

function onListClick(paper) {
  uiStore.papersStore.clickedEntity = paper;
  uiStore.papersStore.selectedArea = paper.area;
  uiStore.bubblesStore.selectedArea = paper.area;
}

export {onListClick};
