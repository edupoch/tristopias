var mundo = new Mundo();
var tristan = new Tristan(mundo);

var $estado = $('.js-estado');

function log(mensaje) {
    console.log('Tristán ' + mensaje);
}

function dibujar() {
    var descripcion = tristan.estado();
    $estado.html(descripcion.join('<br><br>'));

    $estado.find('.js-ir').click(function(e) {
        e.preventDefault();

        var destino = $(this).data('escenario');

        tristan.irA(destino);
        log('se mueve a ' + destino);        
        
        localforage.setItem('situacion', destino).then(function() {
            dibujar();
        });
    });
}

var inicio = localforage.getItem('situacion').then(function(inicio) {
    if (inicio) {
        tristan.irA(inicio);
    }    
    
    dibujar();
});

