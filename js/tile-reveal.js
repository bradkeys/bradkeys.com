// Fades portfolio tiles in as they scroll into view. Tiles that start below
// the fold get a "pre-reveal" class (styled in _style.scss, only for visitors
// who have not asked for reduced motion); an IntersectionObserver removes it.
// Without JS, or without IntersectionObserver, every tile is simply visible.
( function () {
    var tiles = document.querySelectorAll( '#project-list .project' );
    if ( !tiles.length || !( 'IntersectionObserver' in window ) ) { return; }
    if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) { return; }

    var observer = new IntersectionObserver( function ( entries ) {
        entries.forEach( function ( entry ) {
            if ( !entry.isIntersecting ) { return; }
            entry.target.classList.remove( 'pre-reveal' );
            observer.unobserve( entry.target );
        } );
    }, { rootMargin: '0px 0px -8% 0px' } );

    Array.prototype.forEach.call( tiles, function ( tile ) {
        if ( tile.getBoundingClientRect().top > window.innerHeight ) {
            tile.classList.add( 'pre-reveal' );
        }
        observer.observe( tile );
    } );
} )();
