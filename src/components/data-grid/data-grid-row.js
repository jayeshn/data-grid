import React, { Component } from 'react';

class DataGridRow extends Component {
  render() {
    return (
        <tr>
            <td className="selectCol"><input type="checkbox" /></td>
            <td className="menuCol"><button id="row-menu-button"><span className="glyphicon glyphicon-option-horizontal"></span></button></td>
            {this.props.headerCols.map(child => (<td key={child.props.dataField}>{this.props.rowData[child.props.dataField]}</td>))}
        </tr>
    );
  }
}

export default DataGridRow;
