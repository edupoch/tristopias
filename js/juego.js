var mundo = new Mundo();
var tristan = new Tristan(mundo);

var $cargando = $('.js-cargando');
var $estado = $('.js-estado');

function log(mensaje) {
    console.log('Tristán ' + mensaje);
}

function describir() {
    var estado = tristan.estado();

    $estado.html(
        '<div class="card-header">' +
            'Estoy en ' + estado.situacion +
        '</div>' +
        '<div class="card-body">' +
            estado.descripcion + '<br><br>' + 
            estado.uniones.map(union => '<a href="#" class="btn btn-primary js-ir" data-escenario="' + union.id + '"> Ir a ' + union.nombre + '</a>').join(' ') +
        '</div>'
    );

    $estado.find('.js-ir').click(function(e) {
        e.preventDefault();

        var destino = $(this).data('escenario');

        tristan.irA(destino);
        log('se mueve a ' + destino);        
        
        localforage.setItem('situacion', destino).then(function() {
            describir();
        });
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

