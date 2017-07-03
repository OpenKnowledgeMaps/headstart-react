import uiStore from './UIStore';

function onSVGClick(nodes) {
  if (uiStore.forceSimIsDone) {
    const hoveringBubble = nodes.some((node) => node.hover === true);
    const hoveringPaper = uiStore.papersStore.hasHoverPapers;
    const nodeSelected = nodes.some((node) => node.selected === true);
    if (!hoveringBubble && !hoveringPaper && nodeSelected) {
      nodes.forEach((node) => node.selected = false);
      uiStore.resetPaperFlags();
    }
  }
}

function onSVGMouseOver() {
  if (uiStore.forceSimIsDone) {
    if (!uiStore.papersStore.hasHoverPapers &&
        !uiStore.data.nodes.some((node) => node.hover) ) {
      uiStore.papersStore.activeArea = null;
      uiStore.data.nodes.forEach((node) => node.active = false);
    }
  }
}

export {onSVGClick, onSVGMouseOver};