import React, { Component } from 'react';

class DataGridRow extends Component {
  render() {
    return (
        <tr>
            <td className="selectCol"><input type="checkbox" /></td>
            <td className="menuCol"><input type="button" /></td>
            {this.props.headerCols.map(child => (<td>{this.props.rowData[child.props.dataField]}</td>))}
        </tr>
    );
  }
}

export default DataGridRow;
