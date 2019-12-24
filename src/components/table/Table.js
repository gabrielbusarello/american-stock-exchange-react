import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Table.css';
// import rightArrow from '../../../public/rightArrow.png';
import rightArrow from '../../assets/right-arrow.svg';

class Table extends Component {

    constructor(props) {
        super();
        this.props = props;
        // this.state = { symbols: [] };
    }

    getBody = (data, getRow) => {
        return data.map(item => {
            return getRow(item);
        })
    };

    getRow = data => {
        return (
            <tr key={data.symbol}>
                <td><input type="checkbox" id={data.symbol} value={data.symbol} onChange={this.props.checked} /><label htmlFor={data.symbol}></label></td>
                <td>{data.symbol}</td>
                <td>{data.name}</td>
                <td>U$ {data.price}</td>
                <td><Link to={`/about/${data.symbol}?name=${data.name}`}><img src={rightArrow} alt="right arrow" /></Link></td>
            </tr>
        );
    };

    getEmptyState = () => (
        <tr>
            <td colSpan="5" style={{ textAlign: 'center' }}>
                {'Busca sem resultado'}
            </td>
        </tr>
    );

    handleInputChange = (event) => {
        console.log(event);
        this.props.checked(event);
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th width="70"></th>
                        <th width="100">Symbol</th>
                        <th>Name</th>
                        <th width="130">Price</th>
                        <th width="50"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.symbols.length > 0 ? this.getBody(this.props.symbols, this.getRow) : this.getEmptyState()}
                </tbody>
            </table>
        );
    }
}

export default Table;
