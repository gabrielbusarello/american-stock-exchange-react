import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";

import { getIncomeStatement } from '../../services/SymbolsService';
import Chart from '../chart/Chart';
import './About.css';
import returnButton from '../../assets/return-button.svg';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
const getFinancialStatements = async (symbol) => {
    return await getIncomeStatement(symbol).then((response) => {
        if (Object.entries(response.data).length > 0) {
            return response.data.financials.reverse();
        } else {
            return [];
        }
    })
};

function About() {
    const [financialStatements, setFinancialStatements] = useState([]);
    let { symbol } = useParams();
    let query = useQuery();

    useEffect(() => {
        async function fetchFinancialStatements() {
            setFinancialStatements(await getFinancialStatements(symbol));
        }
        fetchFinancialStatements();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    return (
        <div>
            <div className="header">
                <Link to="/"><img src={returnButton} alt="Return home" /></Link>
                <div className="title">
                    <h1>{symbol}</h1>
                    <h3>{query.get('name')}</h3>
                </div>
            </div>
            <div className="charts">
                <Chart financialStatements={financialStatements} type="revenue" name={symbol} />
                <Chart financialStatements={financialStatements} type="ebitda" name={symbol} />
                <Chart financialStatements={financialStatements} type="generalBalance" name={symbol} />
            </div>
        </div>
    );
}

export default About;