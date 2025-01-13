<script lang="ts">
    import {mostrarEspecialidades, BuscarEspecialidadPorNombreEspecialidad} from "$lib/api/apiEspecialidades"
  import { createEventDispatcher, onMount } from "svelte";

    let especialidades = [];

    let busqueda=[];

    let id_seleccionado=0;

    const dispatch = createEventDispatcher();
    

    const mostrar = async (): Promise<void> => {
        try {
            especialidades = await mostrarEspecialidades();
            console.log("Especialidades: ",especialidades);
            
        } catch (error) {
            console.log(error);
        }
    
    }

    const buscarEspecialidad = async (nombre: string) : Promise<void> => {
        try {
            console.log("nombre: ",nombre);
            
            busqueda = await  BuscarEspecialidadPorNombreEspecialidad(nombre);
            console.log(busqueda);
        } catch (error) {
            console.log(error);
        }
    }

    const selecconarItem = (item) => {
        id_seleccionado=item.medico_id;
        dispatch('select_id', id_seleccionado);
        console.log("item: ",item);
        console.log("id_seleccionado: ",id_seleccionado);
        
    }

    onMount(async () => {
        mostrar();
    })
</script>

<select on:change={(event) => buscarEspecialidad(event.target.value)}> 
    <option value="" disabled selected>Selecciona una especialidad

    </option> 
    {#each especialidades as especialidad} 
    <option value={especialidad.nombre}>{especialidad.nombre}

    </option>
     {/each} 
</select>

<ul>
    {#each busqueda as especialidad}
    <li on:click={() => selecconarItem(especialidad)}>{especialidad.medico_nombre}</li>
    {/each}
</ul>