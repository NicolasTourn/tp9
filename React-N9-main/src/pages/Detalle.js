import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useNavigate } from "react-router-dom";
import '../styles/estilo.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Badge } from 'primereact/badge';
import { Panel } from 'primereact/panel';

export default function Detalle({ tareas, setTareas, setEliminarPos }) {
  let { pos } = useParams();
  const [flag, setFlag] = useState(false);
  const [cuerpo, setCuerpo] = useState(tareas[pos]?.text || "");
  const [titulo, setTitulo] = useState(tareas[pos]?.title || "");
  const [tituloValue, setTituloValue] = useState(tareas[pos]?.title || "");
  const [redirecting, setRedirecting] = useState(false); // Estado para controlar la animación de redirección
  const navigate = useNavigate();
  const template = (options) => {
    const className = `${options.className} justify-content-start`;
    const titleClassName = `${options.titleClassName} ml-2 text-primary`;
    const style = { fontSize: '1.25rem' };

    return (
      <div className={className} style={{ backgroundColor: 'var(--primary-600)', color: 'var(--primary-color-text)', borderColor: 'transparent' }}>
        <span className={titleClassName} style={style}>{titulo}</span>
        <Link to={"/"}>
          <Button
            label="Atrás"
            icon="pi pi-arrow-left"
            style={{ right: '0px', }}
            severity="primary"
            rounded
          />
        </Link>
      </div>
    );
  };
  function handleClick() {
    const updatedTareas = [...tareas];
    updatedTareas[pos].completed = !updatedTareas[pos].completed;
    setTareas(updatedTareas);
  }

  function show() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: 'Solicitud exitosa',
      icon: 'success'
    })
  }

  function guardarTarea() {
    const updatedTareas = [...tareas];
    updatedTareas[pos].text = cuerpo;
    updatedTareas[pos].title = tituloValue;
    setTareas(updatedTareas);
    show();
  }

  function eliminarTarea(indice) {
    show();
    setEliminarPos(indice);
    setRedirecting(true); // Iniciar la animación de redirección
  }

  useEffect(() => {
    setCuerpo(tareas[pos]?.text || "");
    setTitulo(tareas[pos]?.title || "");
  }, [tareas, pos]);

  useEffect(() => {
    if (flag) {
      setTitulo(
        <InputTextarea
          style={{ width: "100%", backgroundColor: 'transparent', color: 'white' }}
          autoResize
          rows={1}
          cols={1000}
          defaultValue={tituloValue}
          onChange={(e) => {
            setTituloValue(e.target.value);
          }}
        />
      );
    } else {
      setTitulo(tareas[pos]?.title || "");
    }
  }, [flag, pos, tareas, tituloValue]);

  useEffect(() => {
    if (redirecting) {
      const redirectTimer = setTimeout(() => {
        setRedirecting(false); // Desactivar la animación de redirección después de 500ms
        navigate("/"); // Reemplaza "/" con la ruta deseada
      }, 700);
      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [redirecting, navigate]);

  return (
    <>
      <div style={{ margin: "auto" }} className="vertical-center">
        <div className={`card flex justify-content-center ${redirecting ? "fade-out" : ""}`}>
          <Panel headerTemplate={template}>
            <small style={{ marginRight: '80%' }}><Badge value={tareas[pos].completed ? "COMPLETADA" : "INCOMPLETA"} onClick={handleClick} severity={tareas[pos].completed ? "success" : "danger"} style={{ cursor: 'pointer' }}></Badge></small>
            <small>{tareas[pos]?.date}</small>
            <div style={{ marginTop: '1.5em' }}>
              {!flag && <p className="m-0">{tareas[pos]?.text || ""}</p>}
              {flag && (
                <InputTextarea
                  autoResize
                  style={{ width: "100%" }}
                  rows={5}
                  cols={100}
                  defaultValue={cuerpo}
                  onChange={(e) => {
                    setCuerpo(e.target.value);
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: "center" }}>
              <div className="flexResponsive">
                <div className="flexGroup">
                  {!flag && (
                    <Button
                      label="Editar"
                      icon="pi pi-pencil"
                      style={{ marginRight: "1em" }}
                      onClick={() => {
                        setFlag(true);
                      }}
                      severity="success"
                    />
                  )}
                  {!flag && (
                    <Button
                      label="Borrar"
                      icon="pi pi-times"
                      severity="danger"
                      className="p-button"
                      onClick={() => eliminarTarea(pos)}
                    />
                  )}
                  {flag && (
                    <Button
                      label="Guardar"
                      icon="pi pi-check"
                      style={{ marginRight: "1em" }}
                      onClick={() => {
                        guardarTarea();
                        setFlag(false);
                      }}
                      severity="success"
                    />
                  )}
                  {flag && (
                    <Button
                      label="Cancelar"
                      icon="pi pi-times"
                      severity="danger"
                      className="p-button p-button-secondary"
                      onClick={() => setFlag(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
