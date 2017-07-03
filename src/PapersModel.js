/**
 * Created by rbachleitner on 6/29/17.
 */

import {extendObservable, autorun} from 'mobx';
import PaperModel from './PaperModel';

class PapersModel {
  constructor(data) {
    let papers = [];
    data.papers.forEach((paper) => {
      papers.push(new PaperModel(paper));
    });
    extendObservable(this, {
      papers: papers,
      get selectedPapers() {
        return this.papers.filter((paper) => paper.selected) || [];
      },
      get activePapers() {
        return this.papers.filter((paper) => paper.active) || [];
      },
      get hoverPapers() {
        return this.papers.filter((paper) => paper.hover) || [];
      },
      get hasSelectedPapers() {
        return this.papers.some((paper) => paper.selected);
      },
      get hasActivePapers() {
        return this.papers.some((paper) => paper.active);
      },
      get hasHoverPapers() {
        return this.papers.some((paper) => paper.hover);
      },
      set activeArea(area) {
        this.papersOutsideArea(area).forEach((paper) => {
          paper.active = false;
        });
        this.papersInArea(area).forEach((paper) => {
          paper.active = true;
        });
      },

      set selectedArea(area) {
        this.papersOutsideArea(area).forEach((paper) => {
          paper.selected = false;
          paper.listvisible = false;
        });
        this.papersInArea(area).forEach((paper) => {
          paper.selected = true;
          paper.listvisible = true;
        });
      },

      set clickedPaper(paper) {
        if (paper === null) this.papers.forEach((paper) => paper.clicked = false);
        else {
          this.allOtherPapersExcept(paper).forEach((paper) => paper.clicked = false);
          paper.clicked = !paper.clicked;
          if (!paper.clicked) this.papersInArea(paper.area).forEach((paper) => paper.listvisible = true);
        }
      }

    });
  }

  allOtherPapersExcept(paper) {
    return this.papers.filter((paper_) => paper_ !== paper);
  }

  papersInArea(area) {
    return this.papers.filter((paper) => paper.area === area);
  }

  papersOutsideArea(area) {
    return this.papers.filter((paper) => paper.area !== area);
  }

  disposer() {
    autorun(() => {
      // console.log("papers autorun");
      // console.log(this.selectedPapers);
      // console.log(this.activePapers);
      // console.log(this.hoverPapers);
      // this.papers.forEach((paper) => paper.disposer());
    });

  }
}

// let papersModel = window.papersModel = new PapersModel(data);

export default PapersModel;