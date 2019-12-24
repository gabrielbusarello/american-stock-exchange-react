import React, { useEffect } from 'react';

import Highcharts from 'highcharts';

function Chart({ financialStatements, type }) {

    const createChartRevenue = () => {
        Highcharts.chart('revenue', {
            chart: {
                // type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: 'Receita'
            },
            subtitle: {
                text: 'Demonstrações de resultados anuais'
            },
            xAxis: [{
                categories: financialStatements.map((fin) => fin.date.split('-')[0])
            }],
            yAxis: [
                {
                    title: {
                        text: ''
                    },
                    labels: {
                        format: 'U$ {value}',
                    }
                },
                {
                    title: {
                        text: ''
                    },
                    labels: {
                        format: '{value} %',
                    },
                    opposite: true
                }
            ],
            tooltip: {
                shared: true
            },
            series: [{
                type: 'column',
                name: 'Receita',
                data: financialStatements.map((fin) => Number.parseFloat(fin.Revenue))
            }, {
                type: 'spline',
                name: 'Crescimento da Receita',
                yAxis: 1,
                data: financialStatements.map((fin) => Number.parseFloat(fin['Revenue Growth']) * 100),
                tooltip: {
                    valueSuffix: ' %'
                }
            }]
        });
    }

    const createChartEbitda = () => {
        Highcharts.chart('ebitda', {
            chart: {
                // type: 'spline',
                zoomType: 'xy'
            },
            title: {
                text: 'EBITDA'
            },
            subtitle: {
                text: 'Demonstrações de resultados anuais'
            },
            xAxis: [{
                categories: financialStatements.map((fin) => fin.date.split('-')[0])
            }],
            yAxis: [
                {
                    title: {
                        text: ''
                    },
                    labels: {
                        format: 'U$ {value}',
                    },
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                {
                    title: {
                        text: ''
                    },
                    labels: {
                        format: '{value} %',
                    },
                    opposite: true
                }
            ],
            tooltip: {
                shared: true
            },
            series: [{
                type: 'column',
                name: 'EBITDA',
                data: financialStatements.map((fin) => Number.parseFloat(fin.EBITDA)),
                color: Highcharts.getOptions().colors[2]
            }, {
                type: 'spline',
                name: 'Margem da EBITDA',
                yAxis: 1,
                data: financialStatements.map((fin) => Number.parseFloat(fin['EBITDA Margin']) * 100),
                tooltip: {
                    valueSuffix: ' %'
                },
                color: Highcharts.getOptions().colors[3]
            }]
        });
    }

    const createChartGeneralBalance = () => {
        Highcharts.chart('generalBalance', {
            // chart: {
            //     // type: 'spline',
            //     zoomType: 'xy'
            // },
            title: {
                text: 'Balanço Geral'
            },
            subtitle: {
                text: 'Demonstrações de resultados anuais'
            },
            xAxis: [{
                categories: financialStatements.map((fin) => fin.date.split('-')[0])
            }],
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: 'U$ {value}',
                }
            },
            tooltip: {
                shared: true
            },
            series: [{
                name: 'Receita',
                data: financialStatements.map((fin) => Number.parseFloat(fin.Revenue))
            },
            {
                name: 'Despesas Operacionais',
                data: financialStatements.map((fin) => Number.parseFloat(fin['Operating Expenses']))
            },
            {
                name: 'EBITDA',
                data: financialStatements.map((fin) => Number.parseFloat(fin.EBITDA))
            },
            {
                name: 'Renda Consolidada',
                data: financialStatements.map((fin) => Number.parseFloat(fin['Consolidated Income']))
            }]
        });
    }

    useEffect(() => {
        if (financialStatements && financialStatements.length > 0) {
            switch (type) {
                case 'revenue':
                    createChartRevenue();
                    break;
                case 'ebitda':
                    createChartEbitda();
                    break;
                case 'generalBalance':
                    createChartGeneralBalance();
                    break;
                default:
            }
        }
    })

    return (
        <div id={type} style={{ width: '100%', height: '400px' }}></div>
    );
}

export default Chart;