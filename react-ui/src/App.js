import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import HomePage from './containers/HomePage';
import SectorFormPage from './containers/SectorFormPage';

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
            <NavLink to="sector/new">Add sector</NavLink>
            <Route exact path="/" component={HomePage} />
            <Route path="/sector/new" component={SectorFormPage} />
            <Route path="/sector/edit/:_id" component={SectorFormPage} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
