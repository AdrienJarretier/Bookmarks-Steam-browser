'use strict';

$(() => {

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // console.log(bookmarks);

    let cardTemplate = $('#bookmarkCardTemplate')[0].content;
    // console.log(cardTemplate);

    let COL_SIZE = 4;

    function newBookmarkRow() {

        let row = $('<div class="row bookmarkRow">');
        $('#bookmarksList').append(row);

        return row;

    }

    let row = newBookmarkRow();
    let remainingCols = 12;
    for (let bookmark of bookmarks) {

        // console.log(bookmark);

        let card = $(cardTemplate.cloneNode(true));

        card.find('h5').text(bookmark);
        card.find('a').attr("href", bookmark);

        let col = $('<div>').addClass('col-' + COL_SIZE).append(card);

        row.append(col);

        remainingCols -= COL_SIZE;

        if (remainingCols < COL_SIZE) {
            row = newBookmarkRow();
            remainingCols = 12;
        }

    }

    $('#buttonAddBookmark').click(() => {

        let form = $('#formAddBookmark');
        let uriVal = form.find('input[name=uri]').val();

        // console.log('adding : ' + uriVal)

        bookmarks.push(uriVal);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        // console.log(bookmarks);
        // console.log(localStorage);

    });

});
