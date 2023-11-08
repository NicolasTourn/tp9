import React, { useEffect } from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Tarea from './Tarea.js';
import '../styles/estilo.css'



export default function Inicio({tareas, setTareas, eliminarPos, setEliminarPos}) {

  useEffect (()=>{
    if(eliminarPos !== undefined){
      eliminarTarea(eliminarPos);
      setEliminarPos(undefined);
    }
  },[eliminarPos]) 
  function eliminarTarea(indice) {
    const newtareas = tareas.filter((_, i) => i !== parseInt(indice));
    setTareas(newtareas);
  }
  return (
    <>
    <div className='container1'>
        {tareas.map((tarea, index) => (
          <Tarea legend={tarea.title}  body={tarea.text} key={index} pos={index} completada={tarea.completed} tareas={tareas} setTareas={setTareas}/>
        ))}
        
    </div>
    </>
  );
}

