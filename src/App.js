 import React from 'react';
import logo from './logo.svg';
import { Counter } from './app/components/Listado';
import './App.css';
import {Table} from 'reactstrap'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter} from 'connected-react-router';
import { Listado } from './app/components/Listado';
import FormCreacion from './app/components/FormCreacion';

function App(props) {
  const history = props.history;
  return (
    <BrowserRouter history={history} >
      <Switch>
        <Route exact path="/listado_tareas" component={Listado} />
        <Route exact path="/crear_tarea" component={FormCreacion} />
        <Redirect to="/listado_tareas" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
