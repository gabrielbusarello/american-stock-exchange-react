import React, { Component } from 'react';
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';
import { getSymbolsService } from '../../services/SymbolsService'
import Table from '../table/Table';
import './Home.css';

class Home extends Component {
    constructor() {
        super();
        this.state = { symbols: [], filter: '', selectedSymbols: [] };
    }

    componentDidMount() {
        this.getSymbols();
    }

    getSymbols = () => {
        getSymbolsService().then((response) => {
            this.setState({ symbols: response.data.symbolsList });
        });
    }

    getList = () => {
        if (this.state.filter.length > 0) {
            const symbols = this.state.symbols.filter(item => {
                return Object.keys(item).some(field => {
                    return item[field].toString().toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
                });
            });
            this.setState({ symbols });
        } else {
            this.getSymbols();
        }
    }

    doFilter = debounce((filter) => {
        this.setState({ filter });
        this.getList();
    }, 500);

    selectedSymbols = (event) => {
        const selectedSymbols = this.state.selectedSymbols;
        if (event.target.checked) {
            selectedSymbols.push(event.target.value);
        } else {
            const index = selectedSymbols.findIndex((symbol) => symbol === event.target.value);
            selectedSymbols.splice(index, 1);
        }
        this.setState({ selectedSymbols })
        console.log(this.state.selectedSymbols);
    }

    render() {
        return (
            <div>
                <div className="Action">
                    <input name="search" placeholder="Search" onChange={e => this.doFilter(e.target.value)} />
                    <Link to={`/compare/}`}><button type="submit" >Compare</button></Link>
                </div>
                <Table symbols={this.state.symbols} checked={this.selectedSymbols} />
            </div>
        );
    }
}

export default Home;
