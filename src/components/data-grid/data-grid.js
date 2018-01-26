import React, { Component } from 'react';
import DataGridHeader from './data-grid-header'
import DataGridBody from './data-grid-body'

import '../../css/tooltip.css'

class DataGrid extends Component {
    componentWillMount() {
        let gridChildren = this.props.children;
        let gridCols = [];
        let gridToolbar = [];
        for (var i=0; i< gridChildren.length; i++) {
            // type.name does not work on IE
            switch (gridChildren[i].props.displayName) {
                case 'DataGridHeaderCols':
                    gridCols = gridChildren[i].props.children;
                    break;
                case 'DataGridToolbar':
                    gridToolbar = gridChildren[i].props.children;
                    break;
                default:
                    break;
            }
            
        }
        
        this.setState({
            "gridCols": gridCols,
            "gridToolbarButtons": gridToolbar
        });
    }

    handleRowUpdate(rowIndex, field, newValue) {
         this.props.onRowUpdate(rowIndex, field, newValue); 
    }
        
    handleRowRemove(rowIndex) {
         this.props.onRowRemove(rowIndex); 
    }
        
  render() {
    return (
        <div className="grid-container">
            <table>
                <caption>
                    {this.state.gridToolbarButtons.map(aButton => (aButton.props.children))}
                </caption>
                <DataGridHeader headerCols={this.state.gridCols} />
                <DataGridBody onRowUpdate={this.handleRowUpdate.bind(this)} onRowRemove={this.handleRowRemove.bind(this)} rows={this.props.data} headerCols={this.state.gridCols} />
            </table>
        </div>
    );
  }
}

export default DataGrid;
