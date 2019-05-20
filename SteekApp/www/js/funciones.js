var claseUno = '';
var claseDos = '';
var memoria = 0;
var parUno = '';
var parDos = '';
var contador = 0;
var segundero = 30;

var encendido = {
	'opacity':'1',
	'cursor':'pointer'
};
var apagado = {
	'background':'#ffb76b',
	'opacity':'0.4',
	'cursor':'inherit'
};

// Función para verificar si ya están todos los pares
function func_memoria(memoria){
	// cambiar este valor de acuerdo al número de pares
	if (memoria == 4){
		setTimeout(function() {
			$('.retro.msn').hide().find('p').html('');
			$('#final').show().find('p').html('¡Felicidades! encontraste los pares.');
			reiniciar();
		}, 1500);
	}
}

// Función para reiniciar el juego
function reiniciar(){
	clearInterval(contador);
	$('.crono span').html( 30 );
	$('.boton .init').show();
	$('.boton .reinit').hide();
	$('.memoria article').css(apagado).find('span').css({'display':'none'});

	// limpiar variables
	claseDos = '';
	claseUno = '';
	contador = 0;
	memoria = 0;
	parDos = '';
	parUno = '';
	segundero = 30;

	// desactivar las tarjetas
	$(document).off("click", '.memoria article');
}

// Función de parejas
function parejas(){
	// 'voltear' las fichas (mostrar el texto y cambiar el fondo)
	$(this).css({'background':'#ff7f04'}).find('span').css({'display':'block'});
	// reconocer si es la primer tarjetas o la segunda
	// Es la primera
	if ( parUno === ''){

		parUno = $(this).attr('data-pareja');
		claseUno = $(this).attr('class');

	// Es la segunda
	} else {

		parDos = $(this).attr('data-pareja');
		claseDos = $(this).attr('class');

		// Si las dos tarjetas son iguales
		if ( parUno === parDos ){
			// Mostar mensaje de retroalimentación
			$('.retro.msn').stop().removeClass('incorrecto').show().find('p').html('¡Correcto!');

			// Ocultar mensaje de retroalimentación
			setTimeout( function(){
				$('.retro.msn').fadeOut();
			}, 1500);

			++memoria;
			func_memoria(memoria);

			// limpiar variables
			claseUno = '';
			claseDos = '';

		// Si las dos tarjetas son diferentes
		} else {

			// Mostar mensaje de retroalimentación

			$('.retro.msn').stop().addClass('incorrecto').show().find('p').html('Incorrecto. Vuelve a intentarlo.');

			setTimeout(function() {
				// Ocultar mensaje de retroalimentación
				$('.'+claseUno+', .'+claseDos).css({'background':'#ffb76b'}).find('span').css({'display':'none'});

				// limpiar variables
				claseUno = '';
				claseDos = '';

				// Ocultar mensaje de retroalimentación
				$('.retro.msn').fadeOut();

			}, 1000);
		}

		// limpiar variables
		parUno = '';
		parDos = '';
	}
}

// Función de cronómetro
function crono(){
	// activar las tarjetas
	$(document).on("click", '.memoria article', parejas);

	$('.memoria article').css(encendido);
	$('.boton .init').hide();
	$('.boton .reinit').show();
	segundero = 30;
	contador = setInterval( function() {
		--segundero;
		if (segundero >= 10){
			$('.crono span').html(segundero);
		} else {
			$('.crono span').html('0'+segundero);
		}
		if (segundero === 0){
			$('.retro.msn').stop().addClass('incorrecto').show().find('p').html('¡Se acabó el tiempo!');
			reiniciar();
		}
	}, 1000);
}

$(document).on("click", "#reiniciar", reiniciar);
$(document).on("click", "#iniciar", crono);
