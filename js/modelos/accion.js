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
                
            case 'comer':
                return '<a href="#" class="btn btn-success js-comer" data-objeto="' + this.datos.id + '"> Comer ' + this.datos.nombre + '</a>'
        }

        return '';
    }

    resultado() {
        switch (this.tipo) {
            case 'mirar':
                return this.datos.descripcion;

            case 'hablar':
                return this.datos.acciones.hablar();;
        }

        return '';
    }
}