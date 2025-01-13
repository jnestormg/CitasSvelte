<script lang="ts">
  import {
    obtenerCitas,
    crearCita,
    actualizarCita,
    eliminarCita,
  } from "$lib/api/apiCitas";
  import Buscador from "$lib/buscador/Buscador.svelte";
  import BuscadorMedico from "$lib/buscadorMedico/BuscadorMedico.svelte";

 // import "./app.css";
  import type { Cita } from "$lib/types";
  let citas: Cita[];

  let selectedItem: any= null;
  let selectedID: any= 0;

  const newCita: Cita = {
    ID: 0,
    fecha: null,
    motivo: "",
    estado: "",
    paciente_id: 0,
    medico_id: 0,
  };

  const estados = ["pendiente", "realizada", "cancelada"];

  $:{
    console.log(newCita.estado);
  }
  

  const mostrar = async (): Promise<void> => {
    try {
      citas = await obtenerCitas();
    } catch (error) {
      console.log(error);
    }
  };

  const agregarCita = async (): Promise<void> => {
    try {    
        if (typeof newCita.fecha === "string") { newCita.fecha = new Date(newCita.fecha); }
        await crearCita(newCita);
        console.log("newCita: ",newCita);     
        mostrar();
    } catch (error) {
        console.log(error);
  }
};

  const eliminar = async (id: number): Promise<void> => {
    try {
      await eliminarCita(id);
      mostrar();
    } catch (error) {
      console.log(error);
    }
  };

  mostrar();
  function manejarSelect(event: CustomEvent) {
    console.log("manejarSelect", event.detail);
    selectedItem = event.detail;
    newCita.paciente_id = selectedItem.ID;
    console.log("selectedItem", newCita.paciente_id);
    
  }

  function manejarSelectID(event: CustomEvent) {
    console.log("manejarSelectID", event.detail);
    selectedID = event.detail;
    newCita.medico_id = selectedID;
    console.log("selectedID", newCita.medico_id);
  }
</script>

<div class="container">

    <form on:submit|preventDefault={agregarCita}>  
        <input type="date" bind:value={newCita.fecha} placeholder="Fecha" />
        <input type="text" bind:value={newCita.motivo} placeholder="Motivo" />
        <select bind:value={newCita.estado}>
          <option value="" disabled selected>Selecciona un estado

          </option> 
          {#each estados as estado}
            <option value={estado}>{estado}</option>
          {/each}
        </select>
        <Buscador selectedItem={selectedItem} on:select={manejarSelect} />
        <BuscadorMedico selectedID={selectedID} on:select_id={manejarSelectID} />
        <button type="submit" class="boton_agregar">Agregar</button>
    </form>

  <table>
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Motivo</th>
        <th>Estado</th>
        <th>Paciente</th>
        <th>Medico</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each citas as cita}
        <tr>
          <td>{cita.fecha}</td>
          <td>{cita.motivo}</td>
          <td>{cita.estado}</td>
          <td>{cita.paciente_id}</td>
          <td>{cita.medico_id}</td>
          <td>
            <button on:click={() => eliminar(cita.ID)} class="btn-eliminar">
              Eliminar
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

</div>