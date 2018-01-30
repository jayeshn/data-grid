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

    handleRowUpdate(index, row) {
        this.props.onRowUpdate(index, row); 
    }
    
    handleRowRemove(rowIndex) {
        this.props.onRowRemove(rowIndex); 
    }
    
    handleRowValidate(rowIndex) {
        this.props.onRowValidate(rowIndex); 
    }

    handleRowSelect(rowIndex, selected) {
        this.props.onRowSelect(rowIndex, selected);
    }
    
    render() {
    return (
        <tbody>
            {this.props.rows.map((row, index) => (<DataGridRow 
                                                    onRowSelect={this.handleRowSelect.bind(this)} 
                                                    onRowValidate={this.handleRowValidate.bind(this)} 
                                                    onRowRemove={this.handleRowRemove.bind(this)} 
                                                    onCellChange={this.handleRowUpdate.bind(this, index)} 
                                                    rowIndex={index} 
                                                    key={index} 
                                                    rowData={row} 
                                                    rowMenuItems={this.props.rowMenuItems} 
                                                    headerCols={this.props.headerCols} 
                                                    selectedRows={this.props.selectedRows} />
                                                 ))}
        </tbody>
    );
  }
}

export default DataGridBody;
