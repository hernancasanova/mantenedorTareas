/* eslint-disable no-undef */
import {
    TAREA_LIST, RESET, TAREA_CREATE, TAREA_EDIT, TAREA_REMOVE, TAREA_SELECCIONADA
  } from '../../actiontypes/types';
  
  
  const INITIAL_STATE = {
    tareas:[
        {id:0,descripcion:"Despertar", fechaCreacion: "27-08-2021", vigente: true},
        {id:1,descripcion:"Estudiar", fechaCreacion: "28-08-2021", vigente: false},
        {id:2,descripcion:"Programar", fechaCreacion: "29-08-2021", vigente: true},
        {id:3,descripcion:"Dormir", fechaCreacion: "30-08-2021", vigente: false}
    ],
    tareaSeleccionada:{id:0,descripcion:"", fechaCreacion: "", vigente: true }
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TAREA_CREATE:
        let fechaCreacion=action.payload.fecha_creacion.split('-');
        fechaCreacion=[fechaCreacion[2],fechaCreacion[1],fechaCreacion[0] ].join("-");
        let nuevaTarea={id:state.tareas.length,descripcion:action.payload.descripcion, fechaCreacion, vigente: true};
        return { ...state, tareas: [...state.tareas, nuevaTarea] };
      case TAREA_SELECCIONADA:
        return {...state, tareaSeleccionada:action.payload};
      case TAREA_REMOVE:
        console.log("eliminando tarea: ",action.payload.id);
        //let tareas=state.tareas.filter(e=>{return e.id!=action.payload});
        //console.log("state.tareas: ", state.tareas);
        //let tareas=state.tareas.splice(action.payload.id,1);
        return { ...state, tareas:state.tareas.filter(tarea=>{return tarea.id!=action.payload.id}) };
      case TAREA_EDIT:
        console.log("tarea editada: ",action.payload);
        let copiaTareas=[...state.tareas];
        copiaTareas=action.payload;
        return { ...state, loading: true };
      case RESET:
        return {...state, loading:false};
      default:
        return state;
    }
  };
