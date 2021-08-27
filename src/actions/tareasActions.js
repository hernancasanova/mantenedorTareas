import {
    TAREA_LIST,
    TAREA_CREATE,
    TAREA_EDIT,
    TAREA_REMOVE,
    TAREA_SELECCIONADA,
    RESET
  } from '../actiontypes/types';

  export const eliminarTarea = (id) => ({
    type: TAREA_REMOVE,
    payload: {id}
  });
  export  const tareaSeleccionada = (tarea) => ({
    type: TAREA_SELECCIONADA,
    payload: tarea
  });
  export const crearTarea = (tarea) => ({
    type: TAREA_CREATE,
    payload: tarea
  });
  export const editarTarea = (tarea) => ({
    type: TAREA_EDIT,
    payload: tarea
  });