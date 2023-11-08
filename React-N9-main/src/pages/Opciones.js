import React, { useState } from 'react';
import '../styles/estilo.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';

export default function Opciones({ tareas }) {
  const [activo, setActivo] = useState(false)
  function handleClick() {
    setActivo(!activo);
  }
  const [visible, setVisible] = useState(false);
  const data =
    <div style={{ marginTop: '1em' }}>
      <Link to={"/"}>
        <Button label={<><i className="pi pi-home" style={{ fontSize: '1.25rem' }}></i> Inicio</>} text style={{ fontSize: '1.25rem', width: '100%', textAlign: 'left' }} />
      </Link>
      <br />
      <Link to={"/Crear"}>
        <Button label={<><i className="pi pi-plus-circle" style={{ fontSize: '1.25rem' }}></i> Crear tarea</>} text style={{ fontSize: '1.25rem', width: '100%', textAlign: 'left' }} />
      </Link>
      <Button onClick={handleClick} label={<><i className={!activo ? 'pi pi-angle-right' : 'pi pi-angle-down'} style={{ fontSize: '1.25rem' }}></i> Tareas</>} text className='accordion' style={{ fontSize: '1.25rem', width: '100%', textAlign: 'left' }} />
      <div className="panel" style={{ maxHeight: !activo ? '0' : '100vh', paddingBottom: '0.3em' }}>
        {tareas.map((tarea, index) => (
          <Link to={"/Detalle/" + index}>
            <Button label={tarea.title} text style={{ width: '100%', textAlign: 'left', marginTop: '.3em' }} size='small' />
          </Link>
        ))}
      </div>
    </div>;

  return (
    <div style={{ position: 'fixed', width: '100%', bottom: 10, right: 10, display: 'flex', flexWrap: 'wrap-reverse', flexDirection: 'row-reverse' }}>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        {data}
      </Sidebar>
      <Button style={{ backgroundColor: 'var(--primary-600)', }} icon="pi pi-th-large" onClick={() => setVisible(true)} />
    </div>
  )
}