import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import movies from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import  MainView  from './components/main-view/main-view';

import Container from 'react-bootstrap/Container';


import './index.scss';

const store = createStore(movies, devToolsEnhancer());

//The Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>  
          <MainView />
        </Container>
      </Provider>  
      
    );
  }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);




