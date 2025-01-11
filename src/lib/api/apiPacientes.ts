import axios from "axios";

import type { Paciente } from "$lib/types";

const url="http://localhost:3000/pacientes";

const mostrarPacientes = async () => {
    try {
        const response = await axios.get(url);
        console.log("data: ",response.data);
        
        return response.data;
        
    } catch (error) {
        console.log(error);    }


}
const agregarPaciente = async (paciente: Paciente) => {
    try {
        const response = await axios.post(url, paciente);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const eliminarPaciente = async (id: number) => {    
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const actualizarPaciente = async (id: number, paciente: Paciente) => {
    try {
        const response = await axios.put(`${url}/${id}`, paciente);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {mostrarPacientes, agregarPaciente, eliminarPaciente, actualizarPaciente};
   