import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import HomePage from './containers/HomePage';
import SectorFormPage from './containers/SectorFormPage';
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
                <NavLink to="/task/new">Add task</NavLink>
              </Col>
              <Col xs={6}>
                <NavLink to="/sector/new">Add sector</NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
        <Route exact path="/" component={HomePage} />
        <Route path="/task/new" component={TaskFormPage} />
        <Route path="/task/edit/:_id" component={TaskFormPage} />
        <Route path="/sector/new" component={SectorFormPage} />
        <Route path="/sector/edit/:_id" component={SectorFormPage} />
      </Grid>
    );
  }
}

export default App;
