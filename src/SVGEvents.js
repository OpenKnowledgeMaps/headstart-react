import uiStore from './UIStore';
import logicStore from './logicStore';

function onSVGClick(nodes) {
  if (uiStore.forceSimIsDone) {
    const hoveringBubble = nodes.some((node) => node.hover === true);
    const hoveringPaper = uiStore.data.papers.some((paper) => paper.hover === true);
    const nodeSelected = nodes.some((node) => node.selected === true);
    if (!hoveringBubble && !hoveringPaper && nodeSelected) {
      logicStore.resetCoords();
      nodes.map((node) => node.selected = false);
      uiStore.data.papers.map((paper) => paper.selected = false);
    }
  }
}

function onSVGMouseOver() {
  if (uiStore.forceSimIsDone) {
    if (!uiStore.data.papers.some((paper) => paper.hover) && !uiStore.data.nodes.some((node) => node.hover)) {
      uiStore.data.papers.map((paper) => paper.active = false);
      uiStore.data.nodes.map((node) => node.active = false);
    }
  }
}

export {onSVGClick, onSVGMouseOver};