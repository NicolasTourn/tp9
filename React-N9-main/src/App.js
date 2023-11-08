import React, { useState } from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom";
import Inicio from './pages/Inicio.js'
import Detalle from './pages/Detalle';
import Crear from './pages/Crear'
import Opciones from './pages/Opciones'
function App() {
  const [tareas, setTareas] = useState([
    { title: 'Hacer tarea', text: 'TP React 9', date: new Date("May 25, 2023").toLocaleDateString(), completed: true },
    { title: 'Hacer ejercicio', text: 'Rutina de tren superior', date: new Date("May 25, 2023").toLocaleDateString(), completed: false },
    { title: 'Hacer las compras', text: 'Comprar algo para cenar', date: new Date("May 25, 2023").toLocaleDateString(), completed: false },
  ]);

  const [eliminarPos, setEliminarPos] = useState(undefined);
  return (
    <>
      <Router>
        <div className="App">
          <Opciones tareas={tareas} />
          <Routes>
            <Route path="/" element={<Inicio tareas={tareas} setTareas={setTareas} eliminarPos={eliminarPos} setEliminarPos={setEliminarPos} />} />
            <Route path="/Detalle/:pos" element={<Detalle tareas={tareas} setTareas={setTareas} setEliminarPos={setEliminarPos} />} />
            <Route path="/Crear" element={<Crear tareas={tareas} setTareas={setTareas} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;