/*
 * Magazine sample
*/

const audio2 = new Audio();
const audio3 = new Audio();
audio2.src = 'efectos/garras.mp3'
audio3.src = 'efectos/ice-cube.mp3'
let sonidosCargados2 = 0;
const totalSonidos2 = 2;
function sonidoListo2() {
	sonidosCargados2++;
	if (sonidosCargados2 === totalSonidos2) {
		// Cuando todos los sonidos estén cargados
		//mensajeCarga.textContent = '¡Sonidos listos!';
		//btnSonido1.disabled = false; // Habilitamos los botones

	}
}

// Escuchamos el evento 'canplaythrough' para saber cuándo el sonido está completamente cargado y se puede reproducir sin interrupciones
audio2.addEventListener('canplaythrough', sonidoListo2);
audio3.addEventListener('canplaythrough', sonidoListo2);
function play2(audio) {
	audio.currentTime = 0; // Reinicia el sonido al principio si ya se está reproduciendo
	audio.play();
}


function addPage(page, book) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}

}

function loadPage(page, pageElement) {
	console.log("LoadePAge aca se lee json region")
	// Create an image element

	var img = $('<img />');

	img.mousedown(function (e) {
		e.preventDefault();
	});

	img.load(function () {

		// Set the size
		$(this).css({ width: '100%', height: '100%' });

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator

		pageElement.find('.loader').remove();
	});

	// Load the page

	img.attr('src', 'pages/' + page + '.jpg');

	loadRegions(page, pageElement);

}

// Load regions

function loadRegions(page, element) {

	$.getJSON('pages/region/' + page + '-regions.json').
		done(function (data) {

			$.each(data, function (key, region) {
				addRegion(region, element);
			});
		});

	/* 
	http://www.turnjs.com/samples/magazine/pages/1-regions.json
	
	[{
"x":22,
"y":568,
"width":130,
"height":12,
"class":"link",
"data":
	{
		"url": "http://latimes.com/shopping/vegas"
	}
}
] */


}

// Add region

/* function addRegion(region, pageElement) {

	var reg = $('<div />', { 'class': 'region  ' + region['class'] }),
		options = $('.magazine').turn('options'),
		pageWidth = options.width / 2,
		pageHeight = options.height;

	reg.css({
		top: Math.round(region.y / pageHeight * 100) + '%',
		left: Math.round(region.x / pageWidth * 100) + '%',
		width: Math.round(region.width / pageWidth * 100) + '%',
		height: Math.round(region.height / pageHeight * 100) + '%'
	}).attr('region-data', $.param(region.data || ''));


	reg.appendTo(pageElement);
} */

/* function addRegion(region, pageElement) {

	var reg = $('<div />', { 'class': 'region  ' + region['class'] }),
		options = $('.magazine').turn('options'),
		pageWidth = options.width / 2,
		pageHeight = options.height;

	let regionData = {};
	if (region.ver) {
		regionData.ver = region.ver;
	} else if (region.data && region.data.url) {
		regionData.url = region.data.url;
	} else if (region.data && region.data.page) {
		regionData.page = region.data.page;
	}

	reg.css({
		top: Math.round(region.y / pageHeight * 100) + '%',
		left: Math.round(region.x / pageWidth * 100) + '%',
		width: Math.round(region.width / pageWidth * 100) + '%',
		height: Math.round(region.height / pageHeight * 100) + '%'
	}).attr('region-data', $.param(regionData)); // Serializa solo la propiedad relevante


	reg.appendTo(pageElement);
} */

function addRegion(region, pageElement) {
	if (!region.not) {
		let class2 = 'region';
		/* if (region.src1) {
			//alert(class2)
			class2 = 'imgRegion '
			//alert(region['idp'])
		} */
		var reg = $('<div />', { 'id': region.idp, 'class': class2 + " " + region['class'] }),
			options = $('.magazine').turn('options'),
			pageWidth = options.width / 2,
			pageHeight = options.height;

		reg.css({
			top: Math.round(region.y / pageHeight * 100) + '%',
			left: Math.round(region.x / pageWidth * 100) + '%',
			width: Math.round(region.width / pageWidth * 100) + '%',
			height: Math.round(region.height / pageHeight * 100) + '%'
		});

		// Adjunta los datos directamente usando .data()
		if (region.url) {
			reg.data('url', region.url);
		}
		if (region.page) {
			reg.data('page', region.page);
		}
		if (region.ver) {
			reg.data('ver', region.ver);
		}
		if (region.src1) {
			reg.data('src1', region.src1);
			reg.data('src2', region.src2);
		}
		if (region.idp) {

			reg.data('idp', region.idp);

		}
		if (region.data) { // Si tienes una propiedad "data" más compleja
			$.each(region.data, function (key, value) {
				reg.data(key, value);
			});
		}

		//img(region).appendTo(reg);
		img(region, reg)
		reg.appendTo(pageElement);//el reg se inserta en pageElemto

	}
}

function img(region, reg) {

	/* region.src2 */
	nuevaImg(region, region.src1, 1, region.style1).appendTo(reg)
	nuevaImg(region, "", 2, region.style2).appendTo(reg)
}

function nuevaImg(region, src, nr, style) {
	let nuevaImagen = $("<img/>")
	nuevaImagen.attr('src', src);
	nuevaImagen.attr('alt', 'img');


	//elementoJquery.attr('data-usuario-id', '987');
	if (src) {
		nuevaImagen.attr('data-src', region.src2)
		nuevaImagen.attr('data-id', 'img_' + 2 + "_" + region.idp)
		//para un id 'img_' + nr + "_" + region.idp + 
		nuevaImagen.addClass(region.idp + " regionImagenPrincipal");//imagen principal para el click
	} else {
		nuevaImagen.addClass('img_' + nr + "_" + region.idp);


	}

	if (style) {
		const myDynamicStyles = parseCssStringToObject(style)
		nuevaImagen.css(myDynamicStyles);
	}


	return nuevaImagen;
}



function regionClick(event) {

	var region = $(event.target);
	if (region.hasClass('regionImagenPrincipal')) {
		console.log("evento click region")
		var regionType = $.trim(region.attr('class').replace('regionImagenPrincipal', ''));
		console.log(`Estoy en regionClick -> ${regionType}`)

		return processRegion(region, regionType);
	}

}

/* function processRegion(region, regionType) {

	data = decodeParams(region.attr('region-data'));

	switch (regionType) {
		case 'link':

			window.open(data.url);

			break;
		case 'zoom':

			var regionOffset = region.offset(),
				viewportOffset = $('.magazine-viewport').offset(),
				pos = {
					x: regionOffset.left - viewportOffset.left,
					y: regionOffset.top - viewportOffset.top
				};

			$('.magazine-viewport').zoom('zoomIn', pos);

			break;
		case 'to-page':

			$('.magazine').turn('page', data.page);

			break;
		case 'area':

			alert(data.ver)

			break;
	}

} */
function processRegion(region, regionType) {
	console.log(`processRegion regionType=${regionType}`)

	const tipo = separarLetrasYNumeros(regionType)
	switch (tipo.letras) {
		case 'link':
			window.open(region.data('url'));
			break;
		case 'zoom':

			break;
		case 'to-page':

			break;
		case 'gif':


			const img1 = document.querySelector("div#" + regionType + " ." + regionType)
			let urlImg2 = img1.dataset.src;
			let identificar = img1.dataset.id;
			const img2 = document.querySelector("div#" + regionType + " ." + identificar)
			img2.src = urlImg2

			if (tipo.numeros == 22) {

				img1.style.zIndex = '10'

				setTimeout(() => {
					img1.style.zIndex = '30'
				}, 2000);
				setTimeout(() => {
					play2(audio2)
				}, 300);

			}
			if (tipo.numeros == 26) {
				img1.style.zIndex = '10'

				setTimeout(() => {
					img1.style.zIndex = '30'
				}, 2000);
				setTimeout(() => {
					play2(audio3)
				}, 800);
			}

			img2.style.visibility = 'visible';

			break;


	}
}

// Load large page

function loadLargePage(page, pageElement) {

	var img = $('<img />');

	img.load(function () {

		var prevImg = pageElement.find('img');
		$(this).css({ width: '100%', height: '100%' });
		$(this).appendTo(pageElement);
		prevImg.remove();

	});

	// Loadnew page

	img.attr('src', 'pages/' + page + '-large.jpg');
}

// Load small page

function loadSmallPage(page, pageElement) {

	var img = pageElement.find('img');

	img.css({ width: '100%', height: '100%' });

	img.unbind('load');
	// Loadnew page

	img.attr('src', 'pages/' + page + '.jpg');
}

// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

	return navigator.userAgent.indexOf('Chrome') != -1;

}

function disableControls(page) {
	if (page == 1)
		$('.previous-button').hide();
	else
		$('.previous-button').show();

	if (page == $('.magazine').turn('pages'))
		$('.next-button').hide();
	else
		$('.next-button').show();
}

// Set the width and height for the viewport

function resizeViewport() {

	var width = $(window).width(),
		height = $(window).height(),
		options = $('.magazine').turn('options');

	$('.magazine').removeClass('animated');

	/* 	$('.magazine-viewport').css({
			width: width,
			height: height
		}).zoom('resize'); */


	/* if ($('.magazine').turn('zoom') == 1) {
		var bound = calculateBound({
			width: options.width,
			height: options.height,
			boundWidth: Math.min(options.width, width),
			boundHeight: Math.min(options.height, height)
		});

		if (bound.width % 2 !== 0)
			bound.width -= 1;


		if (bound.width != $('.magazine').width() || bound.height != $('.magazine').height()) {

			$('.magazine').turn('size', bound.width, bound.height);

			if ($('.magazine').turn('page') == 1)
				$('.magazine').turn('peel', 'br');

			$('.next-button').css({ height: bound.height, backgroundPosition: '-38px ' + (bound.height / 2 - 32 / 2) + 'px' });
			$('.previous-button').css({ height: bound.height, backgroundPosition: '-4px ' + (bound.height / 2 - 32 / 2) + 'px' });
		}

		$('.magazine').css({ top: -bound.height / 2, left: -bound.width / 2 });
	} */

	var magazineOffset = $('.magazine').offset(),
		boundH = height - magazineOffset.top - $('.magazine').height(),
		marginTop = (boundH - $('.thumbnails > div').height()) / 2;




	if (marginTop < 0) {
		$('.thumbnails').css({ height: 1 });
	} else {
		$('.thumbnails').css({ height: boundH });
		$('.thumbnails > div').css({ marginTop: marginTop });
	}

	if (!navigator.userAgent.indexOf("Chrome") > -1) {
		$('.thumbnails').css({ height: 1 });

	}

	if (magazineOffset.top < $('.made').height())
		$('.made').hide();
	else
		$('.made').show();

	$('.magazine').addClass('animated');

}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {

	return 2214;

}

// decode URL Parameters

function decodeParams(data) {

	var parts = data.split('&'), d, obj = {};

	for (var i = 0; i < parts.length; i++) {
		d = parts[i].split('=');
		obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
	}

	return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {

	var bound = { width: d.width, height: d.height };

	if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

		var rel = bound.width / bound.height;

		if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

			bound.width = Math.round(d.boundHeight * rel);
			bound.height = d.boundHeight;

		} else {

			bound.width = d.boundWidth;
			bound.height = Math.round(d.boundWidth / rel);

		}
	}

	return bound;
}

function parseCssStringToObject(cssString) {
	const styleObject = {};
	// CAMBIO CLAVE: Dividir la cadena por comas (,) en lugar de puntos y comas (;)
	cssString.split(',').forEach(declaration => {
		declaration = declaration.trim();
		if (!declaration) return; // Saltar si la declaración está vacía

		// Dividir cada declaración por el primer colon (:)
		const firstColonIndex = declaration.indexOf(':');
		if (firstColonIndex === -1) {
			console.warn(`Declaración CSS inválida (sin ':') o incompleta: ${declaration}`);
			return;
		}

		// Limpiar el nombre de la propiedad
		let propName = declaration.substring(0, firstColonIndex).trim();
		// Remover cualquier comilla (simple o doble) que pueda envolver el nombre de la propiedad (ej. 'z-index')
		propName = propName.replace(/^['"]|['"]$/g, '').trim();

		// Obtener y limpiar el valor de la propiedad
		let propValue = declaration.substring(firstColonIndex + 1).trim();
		// Remover cualquier comilla (simple o doble) que pueda envolver el valor
		propValue = propValue.replace(/^['"]|['"]$/g, '').trim();

		// Convertir el nombre de la propiedad a camelCase (para jQuery)
		// Ej. 'background-color' -> 'backgroundColor'
		const camelCasePropName = propName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
		styleObject[camelCasePropName] = propValue;
	});
	//console.log(styleObject)
	return styleObject;
}

function separarLetrasYNumeros(cadena) {
	// Usamos una expresión regular para encontrar letras al principio y números al final.
	// (\D*)  -> Captura cero o más caracteres que NO son dígitos (letras) al principio.
	// (\d*)  -> Captura cero o más dígitos (números) al final.
	const match = cadena.match(/^(\D*)(\d*)$/);

	if (match) {
		// match[0] es la cadena completa (ej: "gif17")
		// match[1] es la parte de letras (ej: "gif")
		// match[2] es la parte de números (ej: "17")
		return {
			letras: match[1],
			numeros: match[2]
		};
	} else {
		// Si no coincide con el patrón esperado, devuelve null o un objeto vacío
		return null; // O { letras: '', numeros: '' }
	}
}