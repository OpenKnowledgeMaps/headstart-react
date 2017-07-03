import React from 'react';
import ReactDOM from 'react-dom';
import uiStore from './UIStore';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={uiStore}/>, div);
});
