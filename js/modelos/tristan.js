class Tristan {
    constructor(mundo) {
        this.mundo = mundo;

        this.situacion = this.mundo.inicio();
        this.inventario = [];
        this.objetivo = false;

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
            objetivo: this.objetivo,
            situacion: this.situacion.nombre,
            descripcion: this.situacion.descripcion,
            personajes: this.mundo.damePersonajes(this.situacion),
            acciones: acciones,
            inventario: this.inventario.map(objeto => this.mundo.dameObjeto(objeto)),
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

    comer(objeto) {
        this.realizando = new Accion('comer', this.mundo.dameObjeto(objeto));
    }

    terminar() {
        this.objetivo = true;
    }

    anadirInventario(objeto) {
        this.inventario.push(objeto);
    }
}