import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../../reducers/counter/counterSlice';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, Spinner, ModalFooter, ModalHeader, Container } from 'reactstrap';
import styles from '../../reducers/counter/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import * as actions from '../../actions/tareasActions';
import FormCreacion from './FormCreacion';

export function Listado(props) {
  var tareas = useSelector(store=>store.tareas.tareas);
  tareas=tareas.filter(tarea=>tarea.vigente===true)
  const dispatch = useDispatch();

  const tareaSeleccionada = (tarea) => {
    dispatch(actions.tareaSeleccionada(tarea))
  }
  const eliminarTarea = (id) => {
    dispatch(actions.eliminarTarea(id));  
  }
  /*const agregarTarea=()=>{
    props.history.push("crear_tarea");
  }*/
  return (
    <Container>
      <Row style={{marginTop:30}}>
        <h1>Listado de tareas</h1>
      </Row>
      <Row>
            <Col xs="6" md="6">
              <Table id="listTareas">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha creación</th>
                    <th scope="col">Vigente</th>
                  </tr>
                </thead>
                <tbody>
                  {tareas.map(tarea=>{
                    return (<tr key={tarea.id} onClick={()=>tareaSeleccionada(tarea)} >
                    <td>{tarea.id}</td>
                    <td>{tarea.descripcion}</td>
                    <td>{tarea.fechaCreacion}</td>
                    <td>{tarea.vigente?"Sí":"No"}</td>
                  </tr>);} )}
                </tbody>
              </Table>
            </Col>
            <Col xs="6" md="6"> 
              <FormCreacion/>
            </Col>
      </Row>
    </Container>
  );
}
