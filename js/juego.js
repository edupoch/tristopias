var mundo = new Mundo();
var tristan = new Tristan(mundo);

var $cargando = $('.js-cargando');
var $estado = $('.js-estado');

function log(mensaje) {
    console.log('Tristán ' + mensaje);
}

function describir() {
    var estado = tristan.estado();

    console.log('Estado');
    console.log(estado);

    var descripcion = '';
    var resultado;
    var resultadoAccion;

    if (estado.realizando) {
        console.log('Realizando');
        console.log(estado.realizando);

        switch(estado.realizando.tipo) {
            case 'mirar':
                resultadoAccion = estado.realizando.resultado() + '<br><br>';
                break;

            case 'hablar':
                resultado = estado.realizando.resultado();
                resultadoAccion = resultado.texto + '<br><br>';
                if (resultado.objeto) {
                    tristan.anadirInventario(resultado.objeto);
                    log('tiene ' + resultado.objeto);
                    estado = tristan.estado();

                    //localforage.setItem('inventario', estado.inventario);
                }
                break;

            case 'comer':
                tristan.terminar();
                estado = tristan.estado();
                break;
        }
        
        console.log('Nuevo estado');
        console.log(estado);
    }

    if (estado.objetivo) {
        descripcion += '<h3 class="my-3 mx-auto">¡HAS GANADO EL JUEGO!</h3>';
    } else {
        descripcion += 
            '<div class="card-header">' +
                'Estás en ' + estado.situacion +
            '</div>';

        descripcion +=
            '<div class="card-body">';

        if (resultadoAccion) {
            descripcion += resultadoAccion;
        }

        descripcion +=
                estado.descripcion + '<br><br>';

        if (estado.personajes.length) {
            descripcion += 
                'Puedes ver a ' +
                estado.personajes.map(personaje => personaje.nombre).join(', ') +
                '<br><br>';                    
        }

        if (estado.inventario.length) {
            console.log('Inventario');
            console.log(estado.inventario);
            descripcion += 
                'Tienes ' +
                estado.inventario.map(objeto => objeto.nombre).join(', ') + 
                '<br><br>';
        }
                
        descripcion +=
                estado.acciones.map(accion => accion.boton()).join(' ');

        if (estado.inventario.length) {
            descripcion += ' ' +
                estado.inventario.map(objeto => objeto.acciones.map(accion => {
                    var a = new Accion(accion, objeto);
                    return a.boton();
                }).join(' '));
        }

        descripcion += '<br><br>';

        descripcion +=
            '</div>';
    }
    

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

        tristan.mirar(elemento);
        
        describir();
    });

    $estado.find('.js-hablar').click(function(e) {
        e.preventDefault();

        var personaje = $(this).data('personaje');

        tristan.hablarCon(personaje);
        
        describir();
    });

    $estado.find('.js-comer').click(function(e) {
        e.preventDefault();

        var objeto = $(this).data('objeto');

        tristan.comer(objeto);
        
        describir();
    });
}

localforage.getItem('situacion').then(function(inicio) {
    if (inicio) {
        tristan.irA(inicio);
    }    

    // localforage.getItem('inventario').then(function(inventario) {
    //     if (inventario) {
    //         tristan.inventario = inventario;
    //     }    
    
        $cargando.hide();        
        describir();
        $estado.show();
    
    // });

});

