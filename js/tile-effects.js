// Cursor spotlight and subtle 3D tilt on portfolio tiles. Only runs for a fine
// pointer that can hover and when the visitor has not asked for less motion;
// the CSS reads --mx/--my (spotlight) and --rx/--ry (tilt) from each tile.
( function () {
    var list = document.getElementById( 'project-list' );
    if ( !list ) { return; }
    if ( !window.matchMedia( '(hover: hover) and (pointer: fine)' ).matches ) { return; }
    if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) { return; }

    var MAX_TILT = 5; // degrees

    list.addEventListener( 'pointermove', function ( event ) {
        var tile = event.target.closest( '.project' );
        if ( !tile ) { return; }
        var box = tile.getBoundingClientRect();
        var x = ( event.clientX - box.left ) / box.width;
        var y = ( event.clientY - box.top ) / box.height;
        tile.classList.add( 'tilting' );
        tile.style.setProperty( '--mx', ( x * 100 ) + '%' );
        tile.style.setProperty( '--my', ( y * 100 ) + '%' );
        tile.style.setProperty( '--ry', ( ( x - 0.5 ) * 2 * MAX_TILT ) + 'deg' );
        tile.style.setProperty( '--rx', ( ( 0.5 - y ) * 2 * MAX_TILT ) + 'deg' );
    } );

    list.addEventListener( 'pointerout', function ( event ) {
        var tile = event.target.closest( '.project' );
        if ( !tile || tile.contains( event.relatedTarget ) ) { return; }
        tile.classList.remove( 'tilting' );
    } );
} )();
