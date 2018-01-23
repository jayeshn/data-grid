import React, { Component } from 'react';
import '../../lib/3rdparty/bootstrap/css/bootstrap.min.css'
import '../../css/menu.css'

class DataGridHeader extends Component {
    render() {
        return (
            <thead>
                
                <tr>
                    <th className="selectCol"><input type="checkbox" /></th>
                    <th className="menuCol"></th>
                    {this.props.headerCols.map(header => (<th key={header.props.dataField}>{header.props.children}</th>))}
                </tr>
            </thead>
        );
    }
}

export default DataGridHeader;
