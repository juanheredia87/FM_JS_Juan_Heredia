/*Efecto Cambio de Color en texto Match Game*/
var x;
    x=$(document);
    x.ready(iniciar);
 /*Funcion para reetir el efecto de texto*/
    function iniciar(){
		/*Variables para los selectores*/
        var x=$("h1");
		var y=$(".panel-score,span");
		/*var z=$(".panel-tablero");*/
		var q=$(".panel-score > div");

		
		/*Efectos de texto al cargar la pagina */
        x.animate({color: "red"}, 1000);
		x.animate({marginLeft: "50%"}, 1000);
		x.animate({marginLeft: "0%"}, 1000);
		x.animate({color: "yellow"},iniciar);

		y.animate({color: "white"}, 1000);
		y.animate({color: "gray"}, iniciar);

		/*Efectos para los bordes de los contenedores 
		z.animate({borderColor: "red"}, 1000);
		z.animate({borderColor: "yellow" }, iniciar);*/

		q.animate({borderColor: "red"}, 1000);
		q.animate({borderColor: "yellow"}, iniciar);

    }


	/*Efecto rebote al presionar el boton reiniciar*/
	$(function(){
		$(".btn-reinicio").on("click", function(){
			$(".score").effect("shake",1000);
			$(".moves").effect("shake",1000);
			$(".time").effect("shake",1000);
		  })
		})


/*Generacion de datos aleatorios*/
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

/*script para obtener columnas de los dulces*/
function giveCandyArrays(arrayType, index) {
    var dulcecl1 = $('.col-1').children();
	var dulcecl2 = $('.col-2').children();
	var dulcecl3 = $('.col-3').children();
	var dulcecl4 = $('.col-4').children();
	var dulcecl5 = $('.col-5').children();
	var dulcecl6 = $('.col-6').children();
	var dulcecl7 = $('.col-7').children();

    var ColumnaDulce = $([dulcecl1, dulcecl2, dulcecl3, dulcecl4,dulcecl5, dulcecl6, dulcecl7
	]);

    if (typeof index === 'number') {
		var FilaDulces = $([dulcecl1.eq(index), dulcecl2.eq(index), dulcecl3.eq(index),
			dulcecl4.eq(index), dulcecl5.eq(index), dulcecl6.eq(index),
			dulcecl7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return ColumnaDulce;
	} else if (arrayType === 'rows' && index !== '') {
		return FilaDulces;
	}
}

/*array de filas*/
function FilaDulces(index) {
	var FilaDulces = giveCandyArrays('rows', index);
	return FilaDulces;
}

/*Array columnas*/
function ColumnaDulce(index) {
	var ColumnaDulce = giveCandyArrays('columns');
	return ColumnaDulce[index];
}

/*3 Verificacion si hay tres dulces del mismo tipo en linea*/
function columnValidation() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = ColumnaDulce(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
	}
}
function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}


/* Validaci{on de dulces a eliminarse en fila*/
function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = FilaDulces(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}
function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

/*Contador de Puntuacion*/
function setScore(candyCount) {
	var puntuacion = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			puntuacion += 10;
			break;
		case 4:
			puntuacion += 25;
			break;
		case 5:
			puntuacion += 40;
			break;
		case 6:
			puntuacion += 50;
			break;
		case 7:
			puntuacion += 100;
	}
	$('#score-text').text(puntuacion);
}

/*carga de elementos */
function checkBoard() {
	fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = getRandomInt(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}

/*validacion de dulces a borrar*/
function setValidations() {
	columnValidation();
	rowValidation();
	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}


/*paso 7 La interacción del usuario con el elemento dulce debe 
ser de drag & drop*/
function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

/*Efecto de dulces al moverse*/
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

/*reemplazo de dulces al moverse*/ 
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);
}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

/*Validacion de puntuacion*/
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

/*Eliminacion de elementos*/
function deletesCandyAnimation() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}


function showPromiseError(error) {
	console.log(error);
}

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}

/*paso 4 Temporizador del Juego*/
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');
}

/*Boton de Iniciar el Juego*/
function initGame() {
	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

$(function() {
	initGame();
});
