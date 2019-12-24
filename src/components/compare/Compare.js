import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

import { getIncomeStatement } from '../../services/SymbolsService';
import Chart from '../chart/Chart';
import './Compare.css';
import returnButton from '../../assets/return-button.svg';

const getFinancialStatements = async (symbols) => {
    return await getIncomeStatement(symbols).then((response) => {
        for (const financialStatements of response.data.financialStatementList) {
            financialStatements.financials.reverse();
        }
        return response.data.financialStatementList.reverse();
    })
};

function Compare() {
    const [financialStatements, setFinancialStatements] = useState([]);
    let { symbols } = useParams();

    useEffect(() => {
        async function fetchFinancialStatements() {
            setFinancialStatements(await getFinancialStatements(symbols));
        }
        fetchFinancialStatements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbols]);

    const getCharts = (data, getChart) => {
        return data.map(item => {
            return getChart(item);
        })
    };

    const getChart = data => {
        return (
            <div key={data.symbol}>
                <h1>{data.symbol}</h1>
                <Chart financialStatements={data.financials} type="generalBalance" name={data.symbol} />
            </div>
        );
    };

    return (
        <div>
            <div className="header">
                <Link to="/"><img src={returnButton} alt="Return home" /></Link>
                <div className="title">
                    <h1>Comparação de Balanço</h1>
                    <h3>Entre: {symbols}</h3>
                </div>
            </div>
            <div className="charts">
                {getCharts(financialStatements, getChart)}
            </div>
        </div>
    )
}

export default Compare;