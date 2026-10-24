// Minimal image lightbox for the portfolio screenshots. Links with the
// "lightbox" class open in a native <dialog>; Esc, arrow keys, swipe and
// clicking outside the image all work. Without JS the links open the image.
(function () {
    var links = Array.prototype.slice.call( document.querySelectorAll( 'a.lightbox' ) );
    if ( !links.length || !window.HTMLDialogElement ) { return; }

    var dialog = document.createElement( 'dialog' );
    dialog.className = 'lightbox-dialog';
    dialog.setAttribute( 'aria-label', 'Image viewer' );
    dialog.innerHTML =
        '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
        '<button class="lightbox-prev" type="button" aria-label="Previous image">&#8249;</button>' +
        '<img class="lightbox-image" alt="" />' +
        '<button class="lightbox-next" type="button" aria-label="Next image">&#8250;</button>' +
        '<div class="lightbox-count" aria-live="polite"></div>';
    document.body.appendChild( dialog );

    var image = dialog.querySelector( '.lightbox-image' );
    var count = dialog.querySelector( '.lightbox-count' );
    var current = 0;

    function show( index ) {
        current = ( index + links.length ) % links.length;
        var thumb = links[current].querySelector( 'img' );
        image.src = links[current].href;
        image.alt = thumb ? thumb.alt : '';
        count.textContent = ( current + 1 ) + ' / ' + links.length;
        // Warm the cache for the neighbours so paging feels instant.
        [ current - 1, current + 1 ].forEach( function ( i ) {
            new Image().src = links[( i + links.length ) % links.length].href;
        } );
    }

    links.forEach( function ( link, i ) {
        link.addEventListener( 'click', function ( e ) {
            if ( e.metaKey || e.ctrlKey || e.shiftKey ) { return; }
            e.preventDefault();
            show( i );
            dialog.showModal();
        } );
    } );

    dialog.querySelector( '.lightbox-close' ).addEventListener( 'click', function () { dialog.close(); } );
    dialog.querySelector( '.lightbox-prev' ).addEventListener( 'click', function () { show( current - 1 ); } );
    dialog.querySelector( '.lightbox-next' ).addEventListener( 'click', function () { show( current + 1 ); } );

    // A click on the backdrop or the empty area around the image closes it.
    dialog.addEventListener( 'click', function ( e ) {
        if ( e.target === dialog ) { dialog.close(); }
    } );

    dialog.addEventListener( 'keydown', function ( e ) {
        if ( e.key === 'ArrowLeft' ) { show( current - 1 ); }
        if ( e.key === 'ArrowRight' ) { show( current + 1 ); }
    } );

    var startX = null;
    dialog.addEventListener( 'touchstart', function ( e ) { startX = e.changedTouches[0].clientX; }, { passive: true } );
    dialog.addEventListener( 'touchend', function ( e ) {
        if ( startX === null ) { return; }
        var dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if ( Math.abs( dx ) > 50 ) { show( current + ( dx < 0 ? 1 : -1 ) ); }
    }, { passive: true } );
}() );
