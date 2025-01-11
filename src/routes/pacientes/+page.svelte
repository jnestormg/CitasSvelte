<script lang="ts">
    import {mostrarPacientes, agregarPaciente, eliminarPaciente, actualizarPaciente} from '$lib/api/apiPacientes';
    import './app.css'
    import type { Paciente } from "$lib/types";
  
    let pacientes: Paciente[];

    const newPaciente: Paciente={
        ID: 0,
        nombre: '',
        apellido: '',
        edad: 0,
        genero: '',
        telefono: '',
        domicilio: {
            calle: '',
            numero: '',
            ciudad: '',
            referencia: '',
        }
    }

    const mostrar = async (): Promise<void> => {
        try {
            pacientes = await mostrarPacientes()
        } catch (error) {
            console.log(error)
            
        }
    }

    const agregar= async (): Promise<void> => {
        try {
            await agregarPaciente(newPaciente)
            console.log("newPaciente: ",newPaciente);
            newPaciente.nombre = '';
            newPaciente.apellido = '';
            newPaciente.edad = 0;
            newPaciente.genero = '';
            newPaciente.telefono = '';
            newPaciente.domicilio.calle = '';
            newPaciente.domicilio.numero = '';
            newPaciente.domicilio.ciudad = '';
            newPaciente.domicilio.referencia = '';
            mostrar()
        } catch (error) {
            console.log(error)
        }
    }

    const eliminar = async (id: number): Promise<void> => {
        try {
            await eliminarPaciente(id)
            mostrar()
        } catch (error) {
            console.log(error)
        }
    }

    mostrar();
    
   
</script>

<div class="container">
    <form on:submit|preventDefault={agregar} class="form">
        <input type="text"  bind:value={newPaciente.nombre} placeholder="Nombre">
        <input type="text" bind:value={newPaciente.apellido} placeholder="Apellido">
        <input type="number" min="0" max="100" bind:value={newPaciente.edad} placeholder="Edad">
        <input type="text" bind:value={newPaciente.genero} placeholder="Genero">
        <input type="text" bind:value={newPaciente.telefono} placeholder="Telefono">
        <input type="text" bind:value={newPaciente.domicilio.calle} placeholder="Calle">
        <input type="text" bind:value={newPaciente.domicilio.numero} placeholder="Numero">
        <input type="text" bind:value={newPaciente.domicilio.ciudad} placeholder="Ciudad">
        <input type="text" bind:value={newPaciente.domicilio.referencia} placeholder="Referencia">
        <input type="reset" class="boton_agregar" value="Limpiar" />

        <button type="submit" class="boton_agregar">Agregar</button>
    </form>
    
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Genero</th>
                <th>Teléfono</th>
                <th>Calle</th>
                <th>Número</th>
                <th>Ciudad</th>
                <th>Referencia</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each pacientes as paciente}
                <tr>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellido}</td>
                    <td>{paciente.edad}</td>
                    <td>{paciente.genero}</td>
                    <td>{paciente.telefono}</td>
                    <td>{paciente.domicilio.calle}</td>
                    <td>{paciente.domicilio.numero}</td>
                    <td>{paciente.domicilio.ciudad}</td>
                    <td>{paciente.domicilio.referencia}</td>
                    <td>
                        <button on:click={() => eliminar(paciente.ID)} class="btn-eliminar">
                            Eliminar
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>


