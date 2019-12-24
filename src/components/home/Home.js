import React, { Component } from 'react';
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce';
import { getSymbolsService } from '../../services/SymbolsService'
import Table from '../table/Table';
import './Home.css';
import times from '../../assets/times.png'

class Home extends Component {
    constructor() {
        super();
        this.state = { symbols: [], filter: '', selectedSymbols: [], symbolsFiltered: [] };
    }

    componentDidMount() {
        this.getSymbols();
    }

    getSymbols = () => {
        this.setState({ filter: '' });
        getSymbolsService().then((response) => {
            this.setState({ symbols: response.data.symbolsList, symbolsFiltered: response.data.symbolsList });
        });
    }

    getList = () => {
        if (this.state.filter.length > 0) {
            const symbolsFiltered = this.state.symbols.filter(item => {
                return Object.keys(item).some(field => {
                    return item[field].toString().toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
                });
            });
            this.setState({ symbolsFiltered });
        } else {
            this.clearFilter();
        }
    }

    doFilter = debounce((filter) => {
        if (filter !== this.state.filter) {
            this.setState({ filter });
            this.getList();
        }
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
    }

    clearFilter = () => {
        this.setState({ symbolsFiltered: this.state.symbols });
    }

    render() {
        return (
            <div>
                <div className="Action">
                    <input name="search" placeholder="Search" onChange={e => this.doFilter(e.target.value)} />
                    <button className="clear" onClick={this.clearFilter}><img src={times} alt="Clear Search" /></button>
                    <Link to={`/compare/${this.state.selectedSymbols}`}><button type="submit" disabled={this.state.selectedSymbols.length === 0}>Compare</button></Link>
                </div>
                <Table symbols={this.state.symbolsFiltered} checked={this.selectedSymbols} />
            </div>
        );
    }
}

export default Home;
