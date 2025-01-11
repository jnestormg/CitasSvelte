<script lang="ts">
  import {
    mostrarMedicos,
    agregarMedico,
    eliminarMedico,
    actualizarMedico,
  } from "$lib/api/apiMedicos";
  import type { Medico, Especialidades } from "$lib/types";
  import { mostrarEspecialidades } from "$lib/api/apiEspecialidades";
  import "./medicos.css";

  let medicos: Medico[];
  let especialidades: Especialidades[];

  const newMedico: Medico = {
    ID: 0,
    nombre: "",
    apellido: "",
    cedula: "",
    domicilio: {
      calle: "",
      numero: "",
      ciudad: "",
      referencia: "",
    },
    especialidades: {
      ID: 0,
      nombre: "",
      descripcion: "",
    },
  };

  const mostrar = async (): Promise<void> => {
    try {
      medicos = await mostrarMedicos();
    } catch (error) {
      console.log(error);
    }
  };

  const agregar = async (): Promise<void> => {
    try {
      await agregarMedico(newMedico);
      mostrar();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id: number): Promise<void> => {
    try {
      await eliminarMedico(id);
      mostrar();
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarEspecialidad = async () => {
    try {
      especialidades = await mostrarEspecialidades();
    } catch (error) {
      console.log(error);
    }
  };

  mostrar();
  mostrarEspecialidad();
</script>

<div class="container">
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Cedula</th>
        <th>Calle</th>
        <th>Número</th>
        <th>Ciudad</th>
        <th>Referencia</th>
        <th>Especialidad</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each medicos as medico}
        <tr>
          <td>{medico.nombre}</td>
          <td>{medico.apellido}</td>
          <td>{medico.cedula}</td>
          <td>{medico.domicilio.calle}</td>
          <td>{medico.domicilio.numero}</td>
          <td>{medico.domicilio.ciudad}</td>
          <td>{medico.domicilio.referencia}</td>
          <td>{medico.especialidades.nombre}</td>
          <td>
            <button on:click={() => eliminar(medico.ID)} class="btn-eliminar"
              >Eliminar</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <form on:submit|preventDefault={agregar} class="form">
    <input type="text" bind:value={newMedico.nombre} placeholder="Nombre" />
    <input type="text" bind:value={newMedico.apellido} placeholder="Apellido" />
    <input type="text" bind:value={newMedico.cedula} placeholder="Cedula" />
    <input
      type="text"
      bind:value={newMedico.domicilio.calle}
      placeholder="Calle"
    />
    <input
      type="text"
      bind:value={newMedico.domicilio.numero}
      placeholder="Numero"
    />
    <input
      type="text"
      bind:value={newMedico.domicilio.ciudad}
      placeholder="Ciudad"
    />
    <input
      type="text"
      bind:value={newMedico.domicilio.referencia}
      placeholder="Referencia"
    />
    <select bind:value={newMedico.especialidades.ID}>
      <option value="">Seleccione una especialidad</option>
      {#each especialidades as especialidad}
        <option value={especialidad.ID}>{especialidad.nombre}</option>
      {/each}
    </select>
    <input type="reset" class="boton_agregar" value="Limpiar" />
    <button type="submit" class="boton_agregar">Agregar</button>
  </form>
</div>
