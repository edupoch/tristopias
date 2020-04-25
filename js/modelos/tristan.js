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

        return [
            'Estoy en ' + this.situacion.nombre,
            this.situacion.descripcion,
            'Puedo ir a ' +  uniones.map(union => '<a href="#" class="js-ir" data-escenario="' + union.id + '">' + union.nombre + '</a>').join(', ')
        ];
    }

    irA(escenario) {
        this.situacion = this.mundo.dameEscenario(escenario);
    }
}