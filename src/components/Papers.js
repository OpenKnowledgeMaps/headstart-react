/**
 * Created by rbachleitner on 6/20/17.
 */

import React from 'react';

import Paper from './Paper';
import {observer} from 'mobx-react';

const Papers =
  observer(
    ({papers}) =>
    {
      const defaultPapers = !papers.some((paper)=>paper.selected) ?
        papers.filter((paper) => !(paper.selected || paper.active || paper.hover))
       : [];
      const activePapers = !papers.some((paper)=>paper.selected) ? papers.filter((paper) => paper.active) : [];
      const selectedPapers = papers.filter((paper) => paper.selected);
      const hoveredPapers = papers.filter((paper) => paper.hover);

      const defaultPapersIndex = defaultPapers.length;
      const activePapersIndex = activePapers.length;
      const selectedPapersIndex = selectedPapers.length;
      return (
        <g>
          {defaultPapers.map((paper, index) =>
            <Paper
              key={index}
              paper={paper}
            />)}
          {activePapers.map((paper, index) =>
           <Paper
            key={index + defaultPapersIndex}
            paper={paper}
          />)}
          {selectedPapers.map((paper, index) =>
            <Paper
              key={index + activePapersIndex + defaultPapersIndex}
              paper={paper}
            />)}
          {hoveredPapers.map((paper, index) =>
            <Paper
              key={index + activePapersIndex + defaultPapersIndex + selectedPapersIndex}
              paper={paper}
            />)}
        </g>);
    }
  );

export default Papers;
