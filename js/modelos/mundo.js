class Escenario {
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class Mundo {
    constructor() {
        this.escenarios = [
            new Escenario(
                'sinapse', 
                'La entrada de Sinapse',
                'Ya ha terminado mi clase de hoy'
            ),
            new Escenario(
                'claseSinapse', 
                'La clase de Sinapse',
                'La clase está vacía'
            ),
            new Escenario(
                'calleSinapse', 
                'La calle',
                'Estoy en Avenida de Oza. Antes de poder seguir avanzando, debería estar acompañado por un adulto'
            ),
        ];

        this.unionesEntreEscenarios = [
            ['sinapse', 'claseSinapse'],
            ['sinapse', 'calleSinapse']
        ];
    }

    dameEscenario(id) {
        return this.escenarios.find(escenario => escenario.id == id);
    }

    uniones(id) {
        return this.unionesEntreEscenarios
            .filter(union => union[0] == id || union[1] == id)
            .map(union => union[0] == id ? this.dameEscenario(union[1]) : this.dameEscenario(union[0]));
    }

    inicio() {
        return this.dameEscenario('sinapse');
    }
}