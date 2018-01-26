import React, { Component } from 'react';
import DataGridRow from './data-grid-row'

class DataGridBody extends Component {

    componentWillMount() {
      let keyField = '';
      let cols = this.props.headerCols;
      for (var i=0; i<cols.length; i++) {
          if (cols[i].props.isKey) {
              keyField = cols[i].props.dataField;
          }
      }
        this.setState({"keyField": keyField});
    }
    
    handleCellUpdate(rowIndex, field, newValue) {
        this.props.onRowUpdate(rowIndex, field, newValue); 
    }
    
    handleRowRemove(rowIndex) {
        this.props.onRowRemove(rowIndex); 
    }
    
    render() {
    return (
        <tbody>
            {this.props.rows.map((row, index) => (<DataGridRow onRowRemove={this.handleRowRemove.bind(this)} onCellChange={this.handleCellUpdate.bind(this)} rowIndex={index} key={row[this.state.keyField]} rowData={row} headerCols={this.props.headerCols} />))}
        </tbody>
    );
  }
}

export default DataGridBody;
