import getList from './src/api/get-list';
import SvbTable from './src/components/svb-table/SvbTable';
import './src/scss/main.scss';

const tableWrapper = document.querySelector('#table-wrapper');

async function initTable() {
    try {
        const response = await getList()

        const svbTable = new SvbTable(response)

        tableWrapper.appendChild(svbTable.element)
    } catch (error) {
        console.log('Ошибка при загрузке данных из getList', error)
    }
}

initTable()