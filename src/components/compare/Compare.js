import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";

import { getIncomeStatement } from '../../services/SymbolsService';
import Chart from '../chart/Chart';
import './Compare.css';
import returnButton from '../../assets/return-button.svg';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
const getFinancialStatements = async (symbol) => {
    return await getIncomeStatement(symbol).then((response) => {
        // console.log(response.data.financials.map((fin) => fin.Revenue));
        return response.data.financials.reverse();
    })
};

function Compare() {
    const [financialStatements, setFinancialStatements] = useState([]);
    let { symbols } = useParams();
    let query = useQuery();

    useEffect(() => {
        console.log(symbols);
        async function fetchFinancialStatements() {
            setFinancialStatements(await getFinancialStatements(symbols));
        }
        fetchFinancialStatements();
        fetchFinancialStatements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbols]);

    return (
        <div>
            <div className="header">
                <Link to="/"><img src={returnButton} alt="Return home" /></Link>
                <div className="title">
                    <h1>{symbols}</h1>
                    <h3>{query.get('name')}</h3>
                </div>
            </div>
            <div className="charts">
                <Chart financialStatements={financialStatements} type="revenue" />
                <Chart financialStatements={financialStatements} type="ebitda" />
                <Chart financialStatements={financialStatements} type="generalBalance" />
            </div>
        </div>
    )
}

export default Compare;