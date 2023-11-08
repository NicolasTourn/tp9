
import React, { useState, useEffect } from 'react';
import '../styles/estilo.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Panel } from 'primereact/panel';
import { Link } from "react-router-dom";
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export default function Tarea({ legend, body, pos, completada, tareas, setTareas }) {
    const template = (options) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };

        return (
            <div className={className} style={{ backgroundColor: 'var(--primary-600)', color: 'var(--primary-color-text)', borderColor: 'transparent' }}>
                <span className={titleClassName} style={style}>{legend}</span>
            </div>
        );
    };
    const [estado, setEstado] = useState("");
    useEffect(() => {
        if (completada) {
            setEstado("Completada")
        } else {
            setEstado("Incompleta")
        }
    }, [completada]);
    function handleClick() {
        const updatedTareas = [...tareas];
        updatedTareas[pos].completed = !updatedTareas[pos].completed;
        setTareas(updatedTareas);
    }
    return (
        <div style={{ width: '100%' }}>
            <Panel headerTemplate={template}>
                <small style={{ marginTop: '0' }}><Badge value={estado.toUpperCase()} onClick={handleClick} severity={completada ? "success" : "danger"} style={{ cursor: 'pointer' }}></Badge></small>
                <p style={{ marginTop: '1.5em' }}>
                    {body}
                </p>
                <div style={{ flex: 1, display: 'flex', justifyContent: "flex-end" }}>
                    <Link to={'/Detalle/' + pos} >
                        <Button label="Ver detalle" severity='secondary' outlined size='small' />
                    </Link>
                </div>
            </Panel>

        </div>
    )
}
