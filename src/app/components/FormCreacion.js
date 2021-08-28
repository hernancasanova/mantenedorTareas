import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Spinner, Button, FormFeedback, FormGroup, FormText, Input, Label, UncontrolledAlert } from 'reactstrap';
import { useForm } from "react-hook-form";
import * as actions from '../../actions/tareasActions';
const FormCreacion = () => {
    console.log("renderizado");
    var fechaCreacion=useSelector(store=>store.tareas.tareaSeleccionada.fechaCreacion);
    var descripcionTarea=useSelector(store=>store.tareas.tareaSeleccionada.descripcion);
    var idTarea=useSelector(store=>store.tareas.tareaSeleccionada.id);
    var fechaCreacion=fechaCreacion.split('-');
    fechaCreacion=[fechaCreacion[2],fechaCreacion[1],fechaCreacion[0] ].join("-");
    const[descripcion,cambiaDescripcion]=useState(descripcionTarea);
    const[fecha,cambiaFecha]=useState(fechaCreacion);
    useEffect(()=>{
        cambiaDescripcion(descripcionTarea);
        cambiaFecha(fechaCreacion);
      },[fechaCreacion,descripcionTarea]);
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const eliminarTarea=(idTarea)=>{
        dispatch(actions.eliminarTarea(idTarea));
    }
    const onsubmit = data => {
        dispatch(actions.crearTarea(data));
        //}
    };
    return (
    <Card className="mb-3">
        <CardHeader> 
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onsubmit)}>
            <FormGroup>
                <Label for="descripcion">Descripción</Label>
                <Input
                type="text"
                name="descripcion"
                id="descripcion"
                placeholder="Ej: Tengo que estudiar"
                //value={descripcion}
                onChange={(e)=>{cambiaDescripcion(e.target.value)}}
                {...register("descripcion", { required: {value: true, message: "La descripción es requerida"}})}
                />
                <span className="text-danger text-small d-block mb-2">
                {errors.descripcion &&  errors.descripcion.message}
                </span>
            </FormGroup>
            <FormGroup>
                  <Label for="fecha_creacion">Fecha Creacion</Label>
                  <Input
                    {...register("fecha_creacion", { required: {value: true, message: "El campo fecha de creacion es requerido"} })}
                    type="date"
                    onChange={(e)=>{cambiaFecha(e.target.value)}}
                    value={fecha}
                    name="fecha_creacion"
                    id="fecha_creacion"
                  />
                  <span className="text-danger text-small d-block mb-2">
                    {errors.fecha_creacion &&  errors.fecha_creacion.message}
                  </span>
                </FormGroup>
            <Button color="success" className="ml-10" type="submit">{descripcionTarea!=""?"Actualizar tarea":"Registrar tarea"}</Button>
            <Button color="danger" onClick={()=>eliminarTarea(idTarea)} id="btnEliminar" disabled={descripcionTarea==""} style={{marginLeft: 5}} >Eliminar tarea</Button>
            </form>
        </CardBody>
        </Card>
    );
}
export default FormCreacion;