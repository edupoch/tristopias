class Escenario {
    constructor(id, nombre, descripcion, personajes) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class Personaje {
    constructor(id, nombre, escenario, descripcion, dialogo) {
        this.id = id;
        this.nombre = nombre;
        this.situacion = escenario;
        this.descripcion = descripcion;
        this.dialogo = dialogo;
    }
}

class Mundo {
    constructor() {
        this.escenarios = [
            new Escenario(
                'sinapse', 
                'La entrada de Sinapse',
                'Ya ha terminado tu clase de hoy',
            ),
            new Escenario(
                'claseSinapse', 
                'La clase de Sinapse',
                'La clase está vacía'
            ),
            new Escenario(
                'calleSinapse', 
                'La calle',
                'Estás en Avenida de Oza. Antes de poder seguir avanzando, deberías estar acompañado por una persona adulta'
            ),
        ];

        this.unionesEntreEscenarios = [
            ['sinapse', 'claseSinapse'],
            ['sinapse', 'calleSinapse']
        ];

        this.personajes = [
            new Personaje(
                'leti',
                'Leticia',
                this.dameEscenario('sinapse'),
                'Sí, es tu madre Leticia',
                '¡Hola Tristán!'
            )
        ];
    }

    dameEscenario(id) {
        return this.escenarios.find(escenario => escenario.id == id);
    }

    uniones(escenario) {
        return this.unionesEntreEscenarios
            .filter(union => union[0] == escenario || union[1] == escenario)
            .map(union => union[0] == escenario ? this.dameEscenario(union[1]) : this.dameEscenario(union[0]));
    }

    damePersonajes(escenario) {
        return this.personajes.filter(personaje => personaje.situacion.id == escenario.id);
    }

    damePersonaje(id) {
        return this.personajes.find(personaje => personaje.id == id);
    }

    inicio() {
        return this.dameEscenario('sinapse');
    }
}