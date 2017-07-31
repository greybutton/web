import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import HomePage from './containers/HomePage';
import AreaFormPage from './containers/AreaFormPage';
import TaskFormPage from './containers/TaskFormPage';

import logo from './laura.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <NavLink to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </NavLink>
            <Row>
              <Col xs={6}>
                <NavLink to="/tasks/new">Add task</NavLink>
              </Col>
              <Col xs={6}>
                <NavLink to="/areas/new">Add area</NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
        <Route exact path="/" component={HomePage} />
        <Route path="/tasks/new" component={TaskFormPage} />
        <Route path="/tasks/edit/:_id" component={TaskFormPage} />
        <Route path="/areas/new" component={AreaFormPage} />
        <Route path="/areas/edit/:_id" component={AreaFormPage} />
      </Grid>
    );
  }
}

export default App;
