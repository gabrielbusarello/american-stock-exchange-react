import axios from 'axios';

export async function getSymbolsService() {
    return axios.get('https://financialmodelingprep.com/api/v3/company/stock/list');
}

export async function getIncomeStatement(symbol) {
    return axios.get(`https://financialmodelingprep.com/api/v3/financials/income-statement/${symbol}`);
}