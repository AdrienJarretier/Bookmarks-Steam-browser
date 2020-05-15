'use strict';

class Cell {

    constructor(ownerSheet, content, line, col) {

        let htmlTableCell = $('<td>')
            .addClass('cell')
            .click(() => {

                if (!this.selected)
                    this.select();

            })
            .focus(() => {

                this.htmlTableCell.text(this.content);

            })
            .attr('contenteditable', true)
            .addClass('single-line')
            .on('input', (e) => {

                this.content = this.htmlTableCell.text();

            })
            .keydown((event) => {

                if (event.key == 'Enter') {

                    if (this.content.startsWith('=')) {

                        let result = math.evaluate(this.content.substring(1));
                        this.htmlTableCell.text(result);

                    }

                    this.ownerSheet.selectCell(this.coordinates.line + 1, this.coordinates.col);

                }

            });


        this.coordinates = {
            line: line,
            col: col
        }
        this.ownerSheet = ownerSheet;
        this.htmlTableCell = htmlTableCell;
        this.content = content;

        this.selected = false;

    }

    select() {

        this.ownerSheet.selected.unselect();
        this.ownerSheet.selected = this;
        this.htmlTableCell.addClass('selected');
        this.htmlTableCell.focus();
        this.selected = true;

    }

    unselect() {

        this.htmlTableCell.removeClass('selected');
        this.selected = false;

    }

}

class Sheet {

    constructor(targetTableId, lines, columns) {

        this.targetHtmlTable = $(targetTableId);

        this.lines = lines;
        this.columns = columns;

        this.cells = [];

        for (let i = 0; i < this.lines; ++i) {

            this.cells.push([]);

            for (let j = 0; j < this.columns; ++j) {

                this.cells[i].push(
                    new Cell(this, '', i, j)
                );

            }
        }

        this.draw(this.targetHtmlTable);

        this.selected = this.cells[0][0];
        this.selected.select();

    }

    selectCell(line, col) {

        this.selected.unselect();
        this.cells[line][col].select();

    }

    draw(targetTable) {

        let line = $('<tr>').append('<th>');

        for (let j = 0; j < this.columns; ++j) {

            let colTitle = (j > 25 ? String.fromCharCode(64 + j / 26) : '')
                + String.fromCharCode((65 + j % 26));

            let colHeader = $('<th>')
                .attr('scope', 'col')
                .text(colTitle);

            line.append(colHeader);

        }
        targetTable.append(line);

        for (let i = 0; i < this.lines; ++i) {

            let line = $('<tr>');
            let lineHeader = $('<th>')
                .attr('scope', 'row')
                .text(i + 1);
            line.append(lineHeader);

            for (let j = 0; j < this.columns; ++j) {

                line.append(this.cells[i][j].htmlTableCell);

            }
            targetTable.append(line);

        }

    }

}

// function keyCode2Char(keyCode) {

//     console.log(keyCode, String.fromCharCode(keyCode));

// }

$(() => {

    let defaultSheet = new Sheet('#sheet', 10, 10);

    // $(document).keydown(function (event) {

    //     // keyCode2Char(event.key);

    //     console.log(event.key);

    //     defaultSheet.selected.content += event.key;

    // });

});