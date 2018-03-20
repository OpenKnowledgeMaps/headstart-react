# Headstart with React and MobX Proof-of-Concept

This is the start of a new implementation of headstart using the React and MobX libraries to
to improve software sustainability, event and state management.

The project is still in an very early phase and will change quickly.

## Getting started

Since this app was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
you will need to have `node` installed with a version `>=6`.
To install the necessary dependencies, issue the command `npm install` after cloning the repo.

To start a development server, just type `npm start`. A browser window will open at `http://localhost:3000`
and you can play around with the app.

You can run the test suite by running `npm test`.

## Deploying

To build a production build run `npm run build`. 
The bundled `html`/`css`/`js` files can be found in the `build` subdirectory.
To deploy the application, serve the `build`-directory's contents via
a server of your choice.

Since there is no integration with the backend yet the site
is just static files so far.
 
TODO: Update deployment instructions once backend is integrated.

![Frontend Architecture](architecture.png "Frontend Architecture overview")

## Project structure

Main Entry point to the execution is the `src/index.js`
file.

#### `src/components`

All React components. Main entry point is found in `src/components/App.js` component.

#### `src/eventhandlers`

Eventhandling functions, named after the general area they are bound to.

#### `src/helpers`

Helper functions, e.g. the force simulation that calculates the layout.

#### `src/models`

MobX stores and their members, e.g. the UIStore, various classes modeling
state of Bubbles/Papers.

#### `src/static`

Static assets and mock data from the backend.

#### `src/stylesheets`

Sass stylesheets. Have to be recompiled manually for now and have
to end up in `src/stylesheets/main.css`.

#### `src/__tests__`

Files to be picked up by the testing suite. Have to have the
file extension *.test.js. Currently not passing.

## HOW TOs

### Adding new svg elements

The root `<svg>` tag can be found in `src/components/Chart.js`. To add a new
element to the svg:

    1. Come up with the state the element needs (coordinates, dimensions)
    and add it to the UIStore (`src/models/UIStore.js`), possibly creating a class
    to manage the element's state if needed.
    
    2. Create a React component in `src/components/`, passing the UIStore to it as a
    prop and getting the necessary state from it. Depending on the state, parts
    of the component can be rendered one way or the other by conditionally adding styling,
    adding/substracting markup within the component's render method.
    
    3. Import the `observer` function from `mobx-react` and wrap your 
    component class/function in it. This connects the component to the UI
    store and will update the component everytime the UI Store's observables
    change.
    
### Adding new interactivity to the visualization

To add new events to existing elements of the frontend:

    1. Look through the existing event-handling functions in `eventhandlers`
    to see whether an event-handler already exists. If it does, use it.
    2. If no event handler exists, create a new one and think of a good name.
    The event handler should modify the UIStore to achieve the desired effect.