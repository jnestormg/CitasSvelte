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

export {mostrarEspecialidades}