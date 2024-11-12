import './styles/svb-table.scss';

export default class SvbTable {
    constructor(tableData) {
        this.element = null;
        this.tableData = tableData;
        this.activeRow = null; 
        this.render();
    }

    render() {
        this.element = SvbTable.createElement('table', 'doc-list-table', 'svb-table');
        
        const thead = SvbTable.createElement('thead', null, null, `
            <tr> 
            ${this.tableData.columns.map(col => `<th data-name="${col}">${this.tableData.settings[col]?.represent || col}</th>`).join('')}
            </tr>
        `);
        
        
        const tbody = this.createTbody();

        this.element.appendChild(thead);
        this.element.appendChild(tbody);


        const tableWrapper = document.querySelector('#table-wrapper');
        tableWrapper.appendChild(this.element);
    }

    createTbody() {
        const tbody = SvbTable.createElement('tbody');
        
        this.tableData.rows.forEach(row => {
            const tr = this.createRow(row);
            tbody.appendChild(tr);
        });

        return tbody;
    }

    createRow(rowData) {
        const tr = SvbTable.createElement('tr');
        tr.dataset.uuid = this.generateUUID();
        
        rowData.forEach(cellData => {
            const td = SvbTable.createElement('td');
            td.textContent = cellData.r || cellData;
            tr.appendChild(td);
        });
        
        tr.addEventListener('click', () => this.setActiveRow(tr));
        tr.addEventListener('mouseover', () => tr.classList.add('highlight'));
        tr.addEventListener('mouseleave', () => tr.classList.remove('highlight'));

        return tr;
    }

    loadRows(newRows) {
        const tbody = this.element.querySelector('tbody');
        tbody.innerHTML = '';
        newRows.forEach(row => {
            const tr = this.createRow(row);
            tbody.appendChild(tr);
        });
    }

    addRow(rowData) {
        const tbody = this.element.querySelector('tbody');
        const tr = this.createRow(rowData);
        tbody.appendChild(tr);
    }

    removeRow(uuid) {
        const row = this.element.querySelector(`tr[data-uuid="${uuid}"]`);
        if (row) row.remove();
    }

    getActiveRow() {
        return this.activeRow;
    }

    setActiveRow(row) {
        if (this.activeRow) {
            this.activeRow.classList.remove('active');
        }
        this.activeRow = row;
        this.activeRow.classList.add('active');
    }

    setValue([uuid, columnName, value]) {
        const row = this.element.querySelector(`tr[data-uuid="${uuid}"]`);
        if (row) {
            const cell = row.querySelector(`td[data-name="${columnName}"]`);
            if (cell) cell.textContent = value;
        }
    }

    getValue([uuid, columnName]) {
        const row = this.element.querySelector(`tr[data-uuid="${uuid}"]`);
        if (row) {
            const cell = Array.from(row.children).find(td => td.dataset.name === columnName);
            return cell ? cell.textContent : null;
        }
        return null;
    }


    generateUUID() {
        return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    }

    static createElement(tagname, id = null, classList = null, innerHTML = null) {
        const element = document.createElement(tagname);
        if (id) element.id = id;
        if (classList) element.className = classList;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }
}
