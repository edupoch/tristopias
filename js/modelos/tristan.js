class Accion {
    constructor(tipo, datos) {
        this.tipo = tipo;
        this.datos = datos;
    }

    boton() {
        switch (this.tipo) {
            case 'ir':
                return '<a href="#" class="btn btn-primary js-ir" data-escenario="' + this.datos.id + '"> Ir a ' + this.datos.nombre + '</a>';

            case 'mirar':
                return '<a href="#" class="btn btn-info js-mirar" data-elemento="' + this.datos.id + '"> Mirar a ' + this.datos.nombre + '</a>';

            case 'hablar':
                return '<a href="#" class="btn btn-warning js-hablar" data-personaje="' + this.datos.id + '"> Hablar con ' + this.datos.nombre + '</a>'
        }

        return '';
    }

    resultado() {
        switch (this.tipo) {
            case 'mirar':
                return this.datos.descripcion;

            case 'hablar':
                return this.datos.nombre + ' dice "' + this.datos.dialogo + '"';
        }

        return '';
    }
}

class Tristan {
    constructor(mundo) {
        this.mundo = mundo;

        this.situacion = this.mundo.inicio();

        // Acciones realizándose
        this.realizando = '';
    }

    saluda() {
        return 'Hola, soy Tristán';
    }

    estado() {
        var acciones = [];
        var uniones = this.mundo.uniones(this.situacion.id);
        var personajes = this.mundo.damePersonajes(this.situacion);
        var realizando = this.realizando;

        acciones = acciones.concat(uniones.map(escenario => new Accion('ir', escenario)));
        acciones = acciones.concat(personajes.map(personaje => new Accion('mirar', personaje)));
        acciones = acciones.concat(personajes.map(personaje => new Accion('hablar', personaje)));

        this.realizando = null;

        return {
            situacion: this.situacion.nombre,
            descripcion: this.situacion.descripcion,
            personajes: this.mundo.damePersonajes(this.situacion),
            acciones: acciones,
            realizando: realizando
        };
    }

    // Acciones

    irA(escenario) {
        this.situacion = this.mundo.dameEscenario(escenario);
    }

    mirar(elemento) {
        this.realizando = new Accion('mirar', this.mundo.damePersonaje(elemento));
    }

    hablarCon(personaje) {
        this.realizando = new Accion('hablar', this.mundo.damePersonaje(personaje));
    }
}