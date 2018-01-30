import React, { Component } from 'react';
import DataGridHeader from './data-grid-header'
import DataGridBody from './data-grid-body'

import '../../css/tooltip.css'

class DataGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "gridCols": [],
            "gridToolbarButtons": [],
            "gridRowMenuItems": [],
            "selectedRows": [],
            "selectedCount": 0
        }

        this.update = this.update.bind(this);
    }
    
    componentWillMount() {
        let gridChildren = this.props.children;
        let gridCols = [];
        let gridToolbar = [];
        let gridRowMenu = [];
        for (var i=0; i< gridChildren.length; i++) {
            switch (gridChildren[i].props.displayName) {
                case 'DataGridHeaderCols':
                    gridCols = gridChildren[i].props.children;
                    break;
                case 'DataGridToolbar':
                    gridToolbar = gridChildren[i].props.children;
                    break;
                case 'DataGridRowMenu':
                    gridRowMenu = gridChildren[i].props.children;
                    break;
                default:
                    break;
            }
            
        }
        
        this.setState({
            "gridCols": gridCols,
            "gridToolbarButtons": gridToolbar,
            "gridRowMenuItems": gridRowMenu
        });
        
    }
    
    rowIsSelected(row) {
        return row
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
        let selRows = this.state.selectedRows;
        selRows[rowIndex] = selected;
        
        let selCount = this.state.selectedCount;
        (selected) ? selCount++ : selCount--;

        this.update(selRows, selCount);

        (selected) 
            ? this.props.onRowSelect(rowIndex) 
            : this.props.onRowUnselect(rowIndex);
    }
    
    update(selectedRows, selectedCount) {
        this.setState({
                        "selectedRows": selectedRows,
                        "selectedCount": selectedCount
                      })
    }

    handleSelectAll(checked) {
        let selectedCount = (checked) ? this.props.data.length : 0

        let selectedRows = this.state.selectedRows;
        for(var i = 0; i < selectedRows.length; i++) {
            selectedRows[i] = checked;
        }

        this.update(selectedRows, selectedCount);
         
        this.props.onSelectAll(checked)
    }

    componentWillReceiveProps(newProps) {
         let selectedRows = []
        newProps.data.map(item => selectedRows.push(false));
       
        this.setState({
            "selectedRows": selectedRows,
            "selectedCount": 0
        });
    }

  render() {
    return (
        <div className="grid-container">
            <table>
                <caption>
                    {this.state.gridToolbarButtons.map(aButton => (aButton.props.children))}
                </caption>
                <DataGridHeader 
                    onSelectAll={this.handleSelectAll.bind(this)} 
                    selectedRowCount={this.state.selectedCount} 
                    totalRowCount={this.props.data.length} 
                    headerCols={this.state.gridCols} />
                <DataGridBody 
                    onRowSelect={this.handleRowSelect.bind(this)} 
                    onRowValidate={this.handleRowValidate.bind(this)} 
                    onRowUpdate={this.handleRowUpdate.bind(this)} 
                    onRowRemove={this.handleRowRemove.bind(this)} 
                    rowMenuItems={this.state.gridRowMenuItems} 
                    rows={this.props.data} 
                    headerCols={this.state.gridCols} 
                    selectedRows={this.state.selectedRows} />
            </table>
        </div>
    );
  }
}

export default DataGrid;
