import React, { Component } from 'react';
import DataGridRow from './data-grid-row'

class DataGridBody extends Component {
  render() {
    return (
        <tbody>
            {this.props.rows.map(row => (<DataGridRow rowData={row} headerCols={this.props.headerCols} />))}
        </tbody>
    );
  }
}

export default DataGridBody;
