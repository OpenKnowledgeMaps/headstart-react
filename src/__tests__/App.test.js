import React from 'react';
import ReactDOM from 'react-dom';
import uiStore from '../models/UIStore';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={uiStore}/>, div);
});
