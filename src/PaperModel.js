/**
 * Created by rbachleitner on 6/29/17.
 */

import {extendObservable, autorun} from 'mobx';

class PaperModel {
  constructor(paper) {
    extendObservable(this, paper);
  }


  disposer() {
    autorun(() => console.log("paper autorun "));
  }
}

export default PaperModel;
