import React, { Component } from 'react';
import DataGridHeader from './data-grid-header'
import DataGridBody from './data-grid-body'

class DataGrid extends Component {
  render() {
    return (
        <div className="grid-container">
            <table>
               <DataGridHeader headerCols={this.props.children} />
               <DataGridBody rows={this.props.data} headerCols={this.props.children} />
            </table>
        </div>
    );
  }
}

export default DataGrid;
