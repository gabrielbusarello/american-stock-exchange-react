import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

import { getIncomeStatement } from '../../services/SymbolsService';
import Chart from '../chart/Chart';
import './Compare.css';
import returnButton from '../../assets/return-button.svg';

const getFinancialStatements = async (symbols) => {
    return await getIncomeStatement(symbols).then((response) => {
        if (Object.entries(response.data).length > 0) {
            for (const financialStatements of response.data.financialStatementList) {
                financialStatements.financials.reverse();
            }
            return response.data.financialStatementList.reverse();
        } else {
            return [];
        }
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

    const renderCharts = () => {
        if (financialStatements.length > 0) {
            return (
                <div className="charts">
                    {getCharts(financialStatements, getChart)}
                </div>
            )
        } else {
            return (
                <div className="charts">
                    <h1>Sem informações</h1>
                </div>
            )
        }
    }

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
            {renderCharts()}
        </div>
    )
}

export default Compare;