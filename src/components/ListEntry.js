import React from 'react';
import { observer } from 'mobx-react';
import { onListClick } from '../models/ListEvents';

const ListEntry =
  observer(
    ({store, paper}) => {
      let abstract = null;
      if (paper.clicked) {
        abstract =
          <div>
            {paper.paper_abstract}
          </div>;
      }
      return (
      <div style={{borderBottom: "2px grey solid", display: "block", padding: "10px"}}>
        <div><span style={{"textDecoration" : "underline"}} onClick={onListClick.bind(this, paper, store)}>{paper.title}</span></div>
        {abstract}
        <div>Area: {paper.area}</div>
      </div>
        );
    }
  );

export default ListEntry;