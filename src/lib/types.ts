export type Paciente = {
    ID: number;
    nombre: string;
    apellido: string;
    edad: number;
    genero: string;
    telefono: string ;
    domicilio: {
        calle: string;
        numero: string;  
        ciudad: string;
        referencia: string;
    };

};

export type Medico={
    ID: number;
    nombre: string;
    apellido: string;
    cedula: string;
    telefono: string ;
    domicilio: {
        calle: string;
        numero: string;  
        ciudad: string;
        referencia: string;
    };
    especialidades:{
        ID: number;
        nombre: string;
        descripcion: string;
    }
}

export type Especialidades={
    ID: number;
    nombre: string;
    descripcion: string;
}

export type Cita={
    ID: number;
    fecha: null | Date;
    motivo: string;
    estado: string;
    paciente_id: number;
    medico_id: number;
}
