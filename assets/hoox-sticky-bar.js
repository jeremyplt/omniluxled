var classActive = 'active';
var element = document.querySelector( '.hoox-sticky-bar-wrapper' );
var isInViewport = function ( elem ) {
	var rect = elem.getBoundingClientRect();
	return (
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		rect.top <= ( window.innerHeight || document.documentElement.clientHeight ) &&
		rect.left <= ( window.innerWidth || document.documentElement.clientWidth )
	);
};

var debounce = function ( func, delay ) {
	var timeout;
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout( timeout );
		timeout = setTimeout( function () {
			func.apply( context, args );
		}, delay );
	};
};

var handleScroll = function () {
	var targetSections = [
		document.querySelector( '.site-footer' ),
		document.querySelector( '.hoox-shop' ),
	];

	var isAnySectionInView = targetSections.some( function ( section ) {
		return section && isInViewport( section );
	} );

	if ( isAnySectionInView ) {
		element.classList.remove( classActive );
	} else {
		element.classList.add( classActive );
	}
};

var debouncedScroll = debounce( handleScroll, 50 ); // Adjust the debounce delay as needed

window.addEventListener( 'scroll', debouncedScroll );