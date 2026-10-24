// Looping muted videos that stand in for GIFs (<video data-autoplay>) only
// download and play while they are on screen. Without JS, or when the visitor
// prefers reduced motion, they stay as normal videos with controls.
(function () {
    var videos = Array.prototype.slice.call( document.querySelectorAll( 'video[data-autoplay]' ) );
    if ( !videos.length ) { return; }

    var reduceMotion = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
    if ( reduceMotion || !( 'IntersectionObserver' in window ) ) { return; }

    var observer = new IntersectionObserver( function ( entries ) {
        entries.forEach( function ( entry ) {
            var video = entry.target;
            if ( entry.isIntersecting ) {
                var started = video.play();
                if ( started && started.catch ) { started.catch( function () {} ); }
            } else {
                video.pause();
            }
        } );
    }, { threshold: 0.25 } );

    videos.forEach( function ( video ) {
        video.controls = false;
        observer.observe( video );
    } );
}() );
