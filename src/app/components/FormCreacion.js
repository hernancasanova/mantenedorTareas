import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner, Button, FormFeedback, FormGroup, FormText, Input, Label, UncontrolledAlert } from 'reactstrap';
import { useForm } from "react-hook-form";
import * as actions from '../../actions/tareasActions';
import { Formik } from 'formik';
const FormCreacion = () => {
    console.log("renderizado");
    var fechaCreacion=useSelector(store=>store.tareas.tareaSeleccionada.fechaCreacion);
    var descripcionTarea=useSelector(store=>store.tareas.tareaSeleccionada.descripcion);
    var idTarea=useSelector(store=>store.tareas.tareaSeleccionada.id);
    fechaCreacion=fechaCreacion.split('-');
    fechaCreacion=[fechaCreacion[2],fechaCreacion[1],fechaCreacion[0] ].join("-");
    const[descripcion,cambiaDescripcion]=useState(descripcionTarea);
    const[fecha,cambiaFecha]=useState(fechaCreacion);
    useEffect(()=>{
        cambiaDescripcion(descripcionTarea);
        cambiaFecha(fechaCreacion);
      },[idTarea]);
    const dispatch = useDispatch();
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const eliminarTarea=(idTarea)=>{
        dispatch(actions.eliminarTarea(idTarea));
    }
    return (
    <Card className="mb-3">
        <CardHeader> 
         <h5>{idTarea>0?"Actualizar tarea":"Registrar nueva tarea"}</h5>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ descripcion: descripcion, fecha_creacion: fecha }}
            validate={values => {
              const errors = {};
              if (values.descripcion==="") {
                errors.descripcion = 'La descripción es requerida';
              } else if (
                true
              ) {
                errors.fecha_creacion = 'La fecha de creación es requerida';
              }
              return errors;
            }}
            onSubmit={(values) => {
              if(idTarea>0){
                dispatch(actions.editarTarea(values));
              }else{
                dispatch(actions.crearTarea(values));
              }         
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <FormGroup>
                  <Label for="descripcion">Descripcion</Label>
                  <Input
                    type="text"
                    onChange={(e)=>{cambiaDescripcion(e.target.value)}}
                    placeholder="Ej: Jugar"
                    value={props.values.descripcion}
                    name="descripcion"
                    id="descripcion"
                  />
                  {props.errors.descripcion && <span className="text-danger text-small d-block mb-2">
                  {props.errors.descripcion}
                </span>}
                </FormGroup>
                <FormGroup>
                  <Label for="fecha_creacion">Fecha Creacion</Label>
                  <Input
                    type="date"
                    onChange={(e)=>{cambiaFecha(e.target.value)}}
                    value={props.values.fecha_creacion}
                    name="fecha_creacion"
                    id="fecha_creacion"
                  />
                  {props.errors.fecha_creacion && <span className="text-danger text-small d-block mb-9">
                  {props.errors.fecha_creacion}
                </span>}
                </FormGroup>
                <br/>
                <Button color="success" className="ml-10" type="submit">{idTarea>0?"Actualizar tarea":"Registrar tarea"}</Button>
                <Button color="danger" onClick={()=>eliminarTarea(idTarea)} disabled={idTarea===0} style={{marginLeft: 5}} >Eliminar tarea</Button>
                <Button color="danger" onClick={()=>dispatch(actions.reset(idTarea))} disabled={idTarea===0} style={{marginLeft: 5}} >Cancelar</Button>
              </form>
            )}
          </Formik>
        </CardBody>
        </Card>
    );
}
export default FormCreacion;