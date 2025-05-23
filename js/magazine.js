/*
 * Magazine sample
*/

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
	let class2 = 'region';
	if (region.src) {
		//alert(class2)
		class2 = 'imgRegion '
		//alert(region['idp'])
	}
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
	if (region.src) {
		reg.data('src', region.src);
	}
	if (region.idp) {

		reg.data('idp', region.idp);

	}
	if (region.data) { // Si tienes una propiedad "data" más compleja
		$.each(region.data, function (key, value) {
			reg.data(key, value);
		});
	}

	img(region).appendTo(reg);

	reg.appendTo(pageElement);//el reg se inserta en pageElemto

}

function img(region) {
	const div = $("div#" + region.idp)
	let nuevaImagen = $("<img/>")
	nuevaImagen.attr('src', region.src);
	nuevaImagen.attr('alt', 'img');
	nuevaImagen.addClass('img_' + region.idp);
	nuevaImagen.css({ width: '90px', height: 'auto', visibility: 'hidden' });
	return nuevaImagen;
}

function video(region) {
	var miVideo = $('<video></video>');

	// Establecer los atributos del <video>
	//miVideo.attr('poster', 'https://i.gifer.com/fetch/w300-preview/70/7064db152d16701a394ee1e5b8e0bccf.gif');
	miVideo.attr("id", "div#" + region.idp);
	miVideo.attr('loop', 'false'); // O simplemente .prop('loop', true);
	miVideo.attr('autoplay', 'false'); // O simplemente .prop('autoplay', true);
	miVideo.attr('playsinline', ''); // O simplemente .prop('playsinline', true);

	// Crear el elemento <source> para el MP4
	var sourceMP4 = $('<source>');
	sourceMP4.attr('src', region.src);
	sourceMP4.attr('type', 'video/mp4');

	// (Opcional) Crear el elemento <source> para WebM
	var sourceWebM = $('<source>');
	sourceWebM.attr('src', region.src); // Reemplaza con la URL real del WebM
	sourceWebM.attr('type', 'video/webm');

	// Agregar las fuentes al elemento <video>
	miVideo.append(sourceMP4);
	miVideo.append(sourceWebM); // Si tienes la fuente WebM

	// Agregar un texto de fallback por si el navegador no soporta <video>
	miVideo.text('Tu navegador no soporta la reproducción de video.');

	// Ahora 'miVideo' es el elemento <video> completo con sus atributos y fuentes.
	// Puedes insertarlo en tu DOM usando appendTo(), prependTo(), append(), etc.
	return miVideo;

}


function regionClick(event) {

	var region = $(event.target);
	if (region.hasClass('region')) {

		var regionType = $.trim(region.attr('class').replace('region', ''));

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

	switch (regionType) {
		case 'link':
			window.open(region.data('url'));
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
			$('.magazine').turn('page', region.data('page'));
			break;
		case 'area':
			//en el json ver pid-- los numeros  deven ser igual a las paginas
			//alert("div#" + region.data('ver') + " img")
			let div_img = $("div#" + region.data('ver') + " img")
			div_img.css('visibility', 'visible')
			break;

		case 'gif':
			//algo si lo toco
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