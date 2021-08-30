/* eslint-disable no-undef */
import { Action } from 'history';
import {
    TAREA_LIST, RESET, TAREA_CREATE, TAREA_EDIT, TAREA_REMOVE, TAREA_SELECCIONADA
  } from '../../actiontypes/types';
  
  
  const INITIAL_STATE = {
    tareas:[
        {id:1,descripcion:"Despertar", fechaCreacion: "27-08-2021", vigente: true},
        {id:2,descripcion:"Estudiar", fechaCreacion: "28-08-2021", vigente: true},
        {id:3,descripcion:"Programar", fechaCreacion: "29-08-2021", vigente: true},
        {id:4,descripcion:"Dormir", fechaCreacion: "30-08-2021", vigente: false}
    ],
    tareaSeleccionada:{id:0,descripcion:"", fechaCreacion: "", vigente: true }
  };
  
  export default (state = INITIAL_STATE, action) => {
    if(action.type===TAREA_CREATE || action.type===TAREA_EDIT){
        var fechaCreacion=action.payload.fecha_creacion.split('-');
        fechaCreacion=[fechaCreacion[2],fechaCreacion[1],fechaCreacion[0] ].join("-");
    }
    switch (action.type) {
      case TAREA_CREATE:
        let nuevaTarea={id:state.tareas.length+1,descripcion:action.payload.descripcion, fechaCreacion, vigente: true};
        return { ...state, tareas: [...state.tareas, nuevaTarea], tareaSeleccionada:{id:0,descripcion:"", fechaCreacion: "", vigente: true } };
      case TAREA_EDIT:
        const index = state.tareaSeleccionada.id;  
        return { ...state, loading: true, tareas: [...state.tareas.slice(0,index-1),
            {id: index, descripcion: action.payload.descripcion, fechaCreacion, vigente: true},
           ...state.tareas.slice(index)], tareaSeleccionada:{id:0,descripcion:"", fechaCreacion: "", vigente: true }  };
      case TAREA_SELECCIONADA:
        return {...state, tareaSeleccionada:action.payload};
      case TAREA_REMOVE:
        let indice=state.tareaSeleccionada.id; 
        return { ...state, loading: true, tareas: [...state.tareas.slice(0,indice-1),
          {id: indice, descripcion: state.tareaSeleccionada.descripcion, fechaCreacion: state.tareaSeleccionada.fechaCreacion, vigente: false},
         ...state.tareas.slice(indice)], tareaSeleccionada:{id:0,descripcion:"", fechaCreacion: "", vigente: true }  };
      case RESET:
        return {...state, loading:false, tareaSeleccionada:{id:0,descripcion:"", fechaCreacion: "", vigente: true }};
      default:
        return state;
    }
  };
