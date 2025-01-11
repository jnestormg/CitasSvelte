import axios from "axios";
import type { Cita } from "$lib/types";

const url= 'http://localhost:3000/citas';

const obtenerCitas = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {     
        console.error('Error en la petición de citas', error);
    }    
}

const crearCita = async (cita: Cita) => {
    try {    
        const response = await axios.post(url, cita);
        return response.data;
    } catch (error) {     
        console.error('Error en la petición de citas', error);
    }    
}

const actualizarCita = async (cita: Cita) => {
    try {    
        const response = await axios.put(`${url}/${cita.ID}`, cita);
        return response.data;
    } catch (error) {     
        console.error('Error en la petición de citas', error);
    }    
}

const eliminarCita = async (id: number) => {    
    try {    
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {     
        console.error('Error en la petición de citas', error);
    }    
}

export {obtenerCitas, crearCita, actualizarCita, eliminarCita};