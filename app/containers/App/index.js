import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import AddCitPage from 'containers/AddCitPage/Loadable';
import TestPage from 'containers/TestPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GlobalStyle from '../../global-styles';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/addCitizen" component={AddCitPage} />
        <Route exact path="/test" component={TestPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
export default DragDropContext(HTML5Backend)(App);
