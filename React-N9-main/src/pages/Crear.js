import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import { Panel } from 'primereact/panel';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Crear({ tareas, setTareas }) {
    const template = (options) => {
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };

        return (
            <div className={className} style={{ backgroundColor: 'var(--primary-600)', color: 'var(--primary-color-text)', borderColor: 'transparent' }}>
                <span className={titleClassName} style={style}>Crear nueva tarea</span>
            </div>
        );
    };
    function nuevaTarea(titulo, texto, fecha, completada) {
        let newtareas = [...tareas];
        newtareas.push({ title: titulo, text: texto, date: fecha, completed: completada });
        setTareas(newtareas);
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Tarea creada con exito',
            icon: 'success'
        })
    };
    const defaultValues = {
        titulo: '',
        cuerpo: '',
        fecha: new Date().toLocaleDateString(),
        completada: false,
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.titulo && data.cuerpo && nuevaTarea(getValues('titulo'), getValues('cuerpo'), getValues('fecha'), getValues('completada'));
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
            <div className="card flex justify-content-center vertical-center">
                <Panel headerTemplate={template}>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2" style={{ marginTop: '1.5em' }}>
                        <Controller
                            name="titulo"
                            control={control}
                            rules={{ required: 'Complete el titulo' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.name}>Titulo</label>
                                    <InputTextarea style={{ width: "100%", marginTop: '0.5em' }} autoResize cols={100} rows={1} id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <span style={{ display: 'block', marginBottom: '1em' }}>{getFormErrorMessage(field.name)}</span>

                                </>
                            )}
                        />
                        <Controller

                            name="cuerpo"
                            control={control}
                            rules={{ required: 'Complete la descripcion' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.name}> Descripcion </label>
                                    <InputTextarea style={{ width: "100%", marginTop: '0.5em' }} autoResize cols={100} rows={5} id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <span style={{ display: 'block', marginBottom: '1em' }}>{getFormErrorMessage(field.name)}</span>
                                </>
                            )}
                        />
                        <Button label={"Crear"} type="submit" severity='primary' raised style={{ marginTop: '1em', width: '50%', margin: 'auto', display: 'block' }} />
                    </form>
                </Panel>

            </div>
        </>
    )
}