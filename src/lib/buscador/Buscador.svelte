<script>
    import { createEventDispatcher, onMount } from "svelte";
    import {obtenerPacientePorNombre} from "$lib/api/apiPacientes";
  
    let query = "";
    let results = [];
    export let selectedItem = null;
    const dispatch = createEventDispatcher();

    const search = async () => {
      try {
        console.log("nombre: ",query);
        
        const pacientes = await obtenerPacientePorNombre(query);
        results = pacientes;

        console.log("paciente ",pacientes);
        
      } catch (error) {
        console.log(error);
      }
    }
    const items = [
      { id: 1, name: "Juan", info: "Ingeniero" },
      { id: 2, name: "María", info: "Doctora" },
      { id: 3, name: "Pedro", info: "Abogado" },
      { id: 4, name: "Ana", info: "Diseñadora" },
      { id: 5, name: "Pedro Perez", info: "Ingeniero" },
    ];
  
   /* function search() {
      results = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }*/
  
    function selectItem(item) {
      selectedItem = item;
      dispatch("select", item);
    }
  
    onMount(() => {
      search();
    });
  </script>
  
  <style>
    .search-bar {
      margin-bottom: 1rem;
    }
    .results {
      list-style-type: none;
      padding: 0;
    }
    .result-item {
      margin-bottom: 0.5rem;
      cursor: pointer;
    }
    .selected-item {
      margin-top: 1rem;
      font-weight: bold;
    }
  </style>
  
  <div class="mt-10">
    <input
      class="search-bar"
      type="text"
      placeholder="Buscar por nombre..."
      bind:value={query}
      on:input={search}
    />
    <ul class="results">
      {#each results as result}
        <li class="result-item" on:click={() => selectItem(result)}>
          {result.nombre}
        </li>
      {/each}
    </ul>
    {#if selectedItem}
      <div class="selected-item">
        <p>Nombre: {selectedItem.nombre}</p>
        <p>Información: {selectedItem.apellido}</p>
      </div>
    {/if}
  </div>
  
  