export class HTMLTable {
    static tableClasses = {
        table: "table",
        tbody: "table__body",
        thead: "table__head",
    };

    constructor(classNames = []) {
        this.table = document.createElement("table");
        this.thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");

        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);

        this.table.classList.add(HTMLTable.tableClasses.table, ...classNames);
        this.thead.classList.add(HTMLTable.tableClasses.thead);
        this.tbody.classList.add(HTMLTable.tableClasses.tbody);
    }

    addHeaderRow(row) {
        this._addRow(row.getElement(), this.thead);
    }
    
    addRow(row) {
        this._addRow(row.getElement(), this.tbody);
    }

    getElement() {
        return this.table;
    }

    render(node) {
        node.append(this.getElement());
    }

    _addRow(row, parent) {
        parent.appendChild(row);
    }
}

export class HTMLTableRow {
    static tableRowClasses = {
        tr: "table__row",
        td: "table__col",
        th: "table__row_head",
    };

    constructor(cols = 1, classNames = [], isHeaderRow = false) {
        this.row = document.createElement("tr");
        this.cols = [];

        for (let i = 0; i < cols; i++) {
            const col = document.createElement(isHeaderRow ? "th" : "td");
            
            col.classList.add(HTMLTableRow.tableRowClasses.td);
            
            this.cols.push(col);
            this.row.appendChild(col);
        }

        if (isHeaderRow) {
            this.row.classList.add(HTMLTableRow.tableRowClasses.th);
        }

        this.row.classList.add(HTMLTableRow.tableRowClasses.tr, ...classNames);
    }

    getElement() {
        return this.row;
    }

    getCol(col) {
        return this.cols[col];
    }
}

