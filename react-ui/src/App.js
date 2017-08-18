import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import HomePage from './containers/HomePage';
import ManualPage from './containers/ManualPage';
import AreaFormPage from './containers/AreaFormPage';
import TaskFormPage from './containers/TaskFormPage';
import AlertMessage from './components/AlertMessage';

import logo from './laura.svg';
import './index.css';

const App = () =>
  (<Grid>
    <Alert contentTemplate={AlertMessage} />
    <Row>
      <Col xs={10} xsOffset={1} sm={12} smOffset={0}>
        <Row className="row_header">
          <NavLink to="/manual">
            <Button bsStyle="link" bsSize="large">
              Manual
            </Button>
          </NavLink>
          <NavLink to="/">
            <img className="logo" src={logo} alt="logo" />
          </NavLink>
          <NavLink to="https://github.com/applaura" target="_blank">
            <Button bsStyle="link" bsSize="large">
              GitHub
            </Button>
          </NavLink>
        </Row>
        <Row>
          <Col xs={6}>
            <NavLink to="/tasks/new">
              <Button bsStyle="link" bsSize="large">
                <Glyphicon glyph="plus" /> Add task
              </Button>
            </NavLink>
          </Col>
          <Col xs={6}>
            <NavLink to="/areas/new">
              <Button bsStyle="link" bsSize="large">
                <Glyphicon glyph="plus" /> Add area
              </Button>
            </NavLink>
          </Col>
        </Row>
      </Col>
    </Row>
    <Route exact path="/" component={HomePage} />
    <Route path="/manual" component={ManualPage} />
    <Route path="/tasks/new" component={TaskFormPage} />
    <Route path="/tasks/edit/:_id" component={TaskFormPage} />
    <Route path="/areas/new" component={AreaFormPage} />
    <Route path="/areas/edit/:_id" component={AreaFormPage} />
  </Grid>);

export default App;
