class Tristan {
    constructor(mundo) {
        this.mundo = mundo;

        this.situacion = this.mundo.inicio();
    }

    saluda() {
        return 'Hola, soy Tristán';
    }

    estado() {
        var uniones = this.mundo.uniones(this.situacion.id);

        return {
            situacion: this.situacion.nombre,
            descripcion: this.situacion.descripcion,
            uniones: uniones
        };
    }

    irA(escenario) {
        this.situacion = this.mundo.dameEscenario(escenario);
    }
}