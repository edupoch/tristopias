var mundo = new Mundo();
var tristan = new Tristan(mundo);

var $cargando = $('.js-cargando');
var $estado = $('.js-estado');

function log(mensaje) {
    console.log('Tristán ' + mensaje);
}

function describir() {
    var estado = tristan.estado();

    var descripcion = '';

    descripcion += 
        '<div class="card-header">' +
            'Estás en ' + estado.situacion +
        '</div>';

    descripcion +=
        '<div class="card-body">';

    if (estado.realizando) {
        descripcion +=
            estado.realizando.resultado() + '<br><br>';
    }

    descripcion +=
            estado.descripcion + '<br><br>';

    if (estado.personajes.length) {
        descripcion += 
            'Puedes ver a ' +
            estado.personajes.map(personaje => personaje.nombre).join(', ') +
            '<br><br>';                    
    }
            
    descripcion +=
            estado.acciones.map(accion => accion.boton()).join(' ');

    descripcion +=
        '</div>';
    

    $estado.html(descripcion);

    $estado.find('.js-ir').click(function(e) {
        e.preventDefault();

        var destino = $(this).data('escenario');

        tristan.irA(destino);
        log('se mueve a ' + destino);        
        
        localforage.setItem('situacion', destino).then(function() {
            describir();
        });
    });

    $estado.find('.js-mirar').click(function(e) {
        e.preventDefault();

        var elemento = $(this).data('elemento');

        var descripcion = tristan.mirar(elemento);
        
        describir();
    });

    $estado.find('.js-hablar').click(function(e) {
        e.preventDefault();

        var personaje = $(this).data('personaje');

        var descripcion = tristan.hablarCon(personaje);
        
        describir();
    });
}

var inicio = localforage.getItem('situacion').then(function(inicio) {
    if (inicio) {
        tristan.irA(inicio);
    }    

    $cargando.hide();        
    describir();
    $estado.show();

});

