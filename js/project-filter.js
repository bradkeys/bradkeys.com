// Filters the portfolio grid by technology and role. The chips are hidden in
// the markup and only shown here, so without JavaScript the full grid shows.
// The filter lives in the URL (?tech=unity&role=developer) so project pages can
// link to a filtered view and a filtered view can be shared.
( function () {
    var box = document.getElementById( 'project-filters' );
    if ( !box ) { return; }

    var tiles = Array.prototype.slice.call( document.querySelectorAll( '#project-list .project' ) );
    var chips = Array.prototype.slice.call( box.querySelectorAll( '.filter-chip' ) );
    var status = document.getElementById( 'filter-status' );
    var state = { tech: '', roles: '' };

    function known( filter, value ) {
        return chips.some( function ( chip ) {
            return chip.dataset.filter === filter && chip.dataset.value === value;
        } );
    }

    function readUrl() {
        var query = new URLSearchParams( window.location.search );
        var tech = query.get( 'tech' ) || '';
        var role = query.get( 'role' ) || '';
        state.tech = known( 'tech', tech ) ? tech : '';
        state.roles = known( 'roles', role ) ? role : '';
    }

    function writeUrl() {
        var query = new URLSearchParams();
        if ( state.tech ) { query.set( 'tech', state.tech ); }
        if ( state.roles ) { query.set( 'role', state.roles ); }
        var text = query.toString();
        window.history.replaceState( null, '', window.location.pathname + ( text ? '?' + text : '' ) );
    }

    function has( tile, filter, value ) {
        return !value || ( tile.dataset[ filter ] || '' ).split( /\s+/ ).indexOf( value ) !== -1;
    }

    function apply() {
        var shown = 0;
        tiles.forEach( function ( tile ) {
            var match = has( tile, 'tech', state.tech ) && has( tile, 'roles', state.roles );
            tile.hidden = !match;
            if ( match ) { shown++; }
        } );
        chips.forEach( function ( chip ) {
            chip.setAttribute( 'aria-pressed', state[ chip.dataset.filter ] === chip.dataset.value ? 'true' : 'false' );
        } );
        if ( !state.tech && !state.roles ) {
            status.textContent = '';
        } else if ( shown === 0 ) {
            status.textContent = 'No projects match these filters.';
        } else {
            status.textContent = 'Showing ' + shown + ' of ' + tiles.length + ' projects.';
        }
    }

    box.addEventListener( 'click', function ( event ) {
        var chip = event.target.closest( '.filter-chip' );
        if ( !chip ) { return; }
        var filter = chip.dataset.filter;
        state[ filter ] = state[ filter ] === chip.dataset.value ? '' : chip.dataset.value;
        writeUrl();
        apply();
    } );

    window.addEventListener( 'popstate', function () { readUrl(); apply(); } );

    readUrl();
    apply();
    box.hidden = false;
} )();
