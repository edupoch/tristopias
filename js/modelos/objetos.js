class Objeto {
    constructor(id, nombre, descripcion, acciones) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.acciones = acciones;
    }
}

var OBJETOS = [
    new Objeto(
        'merienda', 
        'Merienda', 
        'Tu rica merienda',
        [
            'comer',
            //'mirar'
        ]
    )
];