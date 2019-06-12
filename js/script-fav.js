let clickingFav = false;
jQuery('i').on('click', function() {
    let i = jQuery(this);
    let parent = i.parent('li');
    if (parent.length !== 1 || jQuery('#filter-favs').is(':checked')) {
        return;
    }

    clickingFav = true;
    i.toggleClass('far').toggleClass( 'fas' );

    parent.toggleClass('favorite');
    let act = jQuery(this).data('favorite');
    let isFavorite = localStorage.getItem(act);
    if (isFavorite) {
        localStorage.removeItem(act);
    } else {
        localStorage.setItem(act, 'favorited')
    }
});

jQuery('.filter-favs').on('click', function (event) {
    let checked = jQuery(this).is(":checked");
    jQuery('.filter-favs').prop('checked', checked);
    let tds = jQuery('.single-event');
    let count = tds.length;
    if (checked) {
        jQuery('i.fa-lg').hide();
    } else {
        jQuery('i.fa-lg').show();
        tds.removeClass('grey');
    }
    while ( count-- ) {
        let td = jQuery(tds[count]);
        td.removeClass('grey');
        let favorite = td.find('i').data('favorite');
        if (localStorage.getItem(favorite) !== 'favorited') {
            if (checked) {
                td.removeClass('red').addClass('grey');
            } else {
                td.addClass('red');
            }
        }
    }
});

jQuery(document).ready(function() {
    let values = [], keys = Object.keys(localStorage), i = keys.length;
    while ( i-- ) {
        let favorited = localStorage.getItem( keys[i] );
        if (favorited === 'favorited') {
            let icon = jQuery(this).find(`[data-favorite='${keys[i]}']`);
            icon.toggleClass( 'far' ).toggleClass( 'fas' );
            icon.parent().toggleClass('favorite');
        }
    }
});