import axios from "axios";
import type { Medico } from "$lib/types";
const url = 'http://localhost:3000/medicos';
 const mostrarMedicos = async () => {
    try {
        const response = await axios.get(url);        
        return response.data;
    } catch (error) {
        console.log(error);    
    }    
}

const agregarMedico = async (medico: Medico) => {
    try {
        const response = await axios.post(url, medico);
        return response.data;
    } catch (error) {     
        console.log(error);
    }    
}

const eliminarMedico = async (id: number) => {    
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const actualizarMedico = async (id: number, medico: Medico) => {
    try {
        const response = await axios.put(`${url}/${id}`, medico);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}   

export {mostrarMedicos, agregarMedico, eliminarMedico, actualizarMedico};