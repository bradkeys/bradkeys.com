// Click-to-load YouTube embeds: .video-facade links show a thumbnail and only
// swap in the player iframe (and its scripts) when clicked. Without JS they
// remain plain links to the video on YouTube.
(function () {
    Array.prototype.forEach.call( document.querySelectorAll( 'a.video-facade' ), function ( facade ) {
        facade.addEventListener( 'click', function ( e ) {
            if ( e.metaKey || e.ctrlKey || e.shiftKey ) { return; }
            e.preventDefault();

            var frame = document.createElement( 'iframe' );
            frame.src = facade.getAttribute( 'data-embed' );
            frame.title = facade.getAttribute( 'data-title' ) || 'Video';
            frame.setAttribute( 'allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen' );
            frame.setAttribute( 'allowfullscreen', '' );
            frame.setAttribute( 'frameborder', '0' );

            facade.parentNode.replaceChild( frame, facade );
            frame.focus();
        } );
    } );
}() );
