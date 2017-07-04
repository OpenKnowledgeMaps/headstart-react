import React from 'react';
import ReactDOM from 'react-dom';
import data from '../static/Data';
import UIStore from '../models/UIStore';
import App from '../components/App';

it('renders without crashing', () => {
  let store = new UIStore(data);
  store.papersStore.disposer();
  store.disposer();
  const div = document.createElement('div');
  ReactDOM.render(<App store={store}/>, div);
});
