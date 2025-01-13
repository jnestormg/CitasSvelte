import axios from "axios";

const url = 'http://localhost:3000/especialidades';
const mostrarEspecialidades = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const BuscarEspecialidadPorNombreEspecialidad = async ( nombreEspecialidad: string) => {
    try {
        const response = await axios.get(`${url}/nombre/${nombreEspecialidad}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {mostrarEspecialidades, BuscarEspecialidadPorNombreEspecialidad};