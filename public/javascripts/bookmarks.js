'use strict';

$(async () => {

    // let bookmarks = JSON.parse(get('/bookmarks')) || [];

    let bookmarks = await get('/bookmarks');

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

    function appendBookmark(bookmark) {

        let card = $(cardTemplate.cloneNode(true));


        let deleteButton = card.find('button[name="deleteBookmarkButton"]');

        deleteButton
            .click(async function () {

                try {

                    let infos = await sendDelete('/bookmarks/' + bookmark.id);

                    col.remove();
                }
                catch (e) {

                    console.error(e);
                }

            });

        let bmkName = (bookmark.name.length > 0 ? bookmark.name : bookmark.uri);

        let uri = bookmark.uri;
        let protocol = uri.match('^([a-zA-Z]+):\/\/')[1];

        card.find('h5').text(bmkName);

        let goButton = card.find('a');
        goButton.attr("href", uri);

        if (protocol.toLowerCase() == 'file') {

            goButton.click(() => {

                goButton.html('Right click and <br> Open Link In New Tab ');

            });
        }

        let col = $('<div>').addClass('col-md-' + COL_SIZE).append(card);

        row.append(col);

        remainingCols -= COL_SIZE;

        if (remainingCols < COL_SIZE) {
            row = newBookmarkRow();
            remainingCols = 12;
        }

    }

    for (let bookmark of bookmarks) {

        appendBookmark(bookmark);

    }

    $('#buttonAddBookmark').click(async () => {

        let form = $('#formAddBookmark');

        let nameInput = form.find('input[name=name]');
        let uriInput = form.find('input[name=uri]');

        let bookmark = await post('/bookmarks', {
            name: nameInput.val(),
            uri: uriInput.val()
        });

        appendBookmark(bookmark);

        nameInput.val('');
        uriInput.val('');

    });

});
