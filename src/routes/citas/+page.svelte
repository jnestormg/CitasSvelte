<script lang="ts">
  import {
    obtenerCitas,
    crearCita,
    actualizarCita,
    eliminarCita,
  } from "$lib/api/apiCitas";

 // import "./app.css";
  import type { Cita } from "$lib/types";
  let citas: Cita[];

  const newCita: Cita = {
    ID: 0,
    fecha: "",
    motivo: "",
    estado: "",
    paciente_id: 0,
    medico_id: 0,
  };

  const mostrar = async (): Promise<void> => {
    try {
      citas = await obtenerCitas();
    } catch (error) {
      console.log(error);
    }
  };

  const agregarCita = async (): Promise<void> => {
    try {    
        await crearCita(newCita);
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
</script>

<div class="container">

    <form on:submit|preventDefault={agregarCita}>  
        <input type="date" bind:value={newCita.fecha} placeholder="Fecha" />
        <input type="text" bind:value={newCita.motivo} placeholder="Motivo" />
        <input type="text" bind:value={newCita.estado} placeholder="Estado" />
        <input type="number" bind:value={newCita.paciente_id} placeholder="Paciente" />
        <input type="number" bind:value={newCita.medico_id} placeholder="Medico" />
        <button type="submit" class="boton_agregar">Agregar</button>

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