import dateSignState from './dateSignState.json';
import empSignUserList from './empSignUserList.json'
import signMonthlyStatisticsList from './signMonthlyStatisticsList.json'


const mockJson={
    'GET /qtyx/app/signCount/empSignUserList.do': empSignUserList,
    'GET /qtyx/app/signCount/signDiurnalStatisticsList.do': dateSignState,
    'GET /qtyx/app/signCount/signMonthlyStatisticsList.do': signMonthlyStatisticsList,
}
export default {};
