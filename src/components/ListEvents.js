/**
 * Created by rbachleitner on 6/27/17.
 */
import uiStore from '../models/UIStore';
import logicStore from '../models/logicStore';

function onListClick(paper) {
  uiStore.papersStore.papers.forEach((paper) => paper.listvisible = false);
  let node = uiStore.data.nodes.find((node) => node.area === paper.area);
  node.selected = true;
  paper.clicked = true;
  uiStore.papersStore.papers.filter((paper_) => paper_.area === paper.area).forEach((paper) => {
    paper.selected = true;
    paper.listvisible = true;
  });
  logicStore.updateZoomState(node);
}

export {onListClick};