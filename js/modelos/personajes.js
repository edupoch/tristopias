class Personaje {
    constructor(id, nombre, escenario, descripcion, acciones) {
        this.id = id;
        this.nombre = nombre;
        this.situacion = escenario;
        this.descripcion = descripcion;
        this.acciones = acciones;        
    }
}

var PERSONAJES = [
    new Personaje(
        'leti',
        'Leticia',
        'sinapse',
        'Sí, es tu madre Leticia',
        {
            'hablar': function() {
                return {
                    texto: 'Leticia dice: "Aquí tienes tu merienda, Tristán"',
                    objeto: 'merienda'
                }
            }
        }                
    )
];