import React, { Component } from 'react';
import DataGrid from './components/data-grid/data-grid'
import DataGridHeaderCols from './components/data-grid/data-grid-header-cols'
import DataGridHeaderCol from './components/data-grid/data-grid-header-col'
import DataGridToolbar from './components/data-grid/data-grid-toolbar'
import DataGridToolbarButton from './components/data-grid/data-grid-toolbar-button'
import DataGridRowMenu from './components/data-grid/data-grid-row-menu'
import DataGridRowMenuItem from './components/data-grid/data-grid-row-menu-item'
import * as RestService from './utilities/rest-utilities';
import './css/grid.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "data": []
        };
        
        this.selectedCount = 0;
        this.selectedRowIndex = [];
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        let self = this;
        RestService.httpGet('http://localhost:3001/numberDesign/1/2').then(function(resp) {
			let data = resp;
            let selectedRowIndex = [];
            data.map(item => selectedRowIndex.push(false));
			self.setState({
                "data": data
            });
            self.selectedRowIndex = selectedRowIndex
		},function(resp) {
            console.log('errorrrrrrrr in load')
        });
    }

    getNumberTypes() {
        return [
            {"value":"Native", "display":"Native"},
            {"value":"Ported", "display":"Ported"},
            {"value":"Toll Free", "display":"Toll Free"}
        ]
    }

    getStatusTypes() {
        return [
            {"value":"Inventory", "display":"Inventory"},
            {"value":"Identified", "display":"Identified"},
            {"value":"Ported", "display":"Ported"},
            {"value":"Porting", "display":"Porting"},
            {"value":"Reserved", "display":"Reserved"},
            {"value":"Validated", "display":"Validated"}
        ]
    }

    render() {
    return (
      <div className="App">
        <DataGrid data={this.state.data}
           onRowSelect={this.handleRowSelect.bind(this)}
           onRowUnselect={this.handleRowUnselect.bind(this)}
           onSelectAll={this.handleSelectAll.bind(this)}
           onRowUpdate={this.handleRowUpdate.bind(this)}
           onRowRemove={this.handleRowRemove.bind(this)}
           onRowValidate={this.handleRowValidate.bind(this)}
           selectedRowCount={this.state.selectedCount}>
            <DataGridHeaderCols displayName="DataGridHeaderCols">
                <DataGridHeaderCol isKey={true} dataField="telephone_number">Number</DataGridHeaderCol>
                <DataGridHeaderCol dataField="number_type" fieldType="enum" enumValues={this.getNumberTypes()}>Type</DataGridHeaderCol>
                <DataGridHeaderCol dataField="number_status" fieldType="enum" enumValues={this.getStatusTypes()} nonEditable>Status</DataGridHeaderCol>
                <DataGridHeaderCol dataField="btn">BTN</DataGridHeaderCol>
                <DataGridHeaderCol dataField="provider">Provider</DataGridHeaderCol>
                <DataGridHeaderCol dataField="port_status">Port Status</DataGridHeaderCol>
                <DataGridHeaderCol dataField="site">Site</DataGridHeaderCol>
                <DataGridHeaderCol dataField="address">Address</DataGridHeaderCol>
                <DataGridHeaderCol dataField="da_dl">DA/DL</DataGridHeaderCol>
                <DataGridHeaderCol dataField="trunk">Trunk</DataGridHeaderCol>
                <DataGridHeaderCol dataField="forwarded">Forwarded</DataGridHeaderCol>
            </DataGridHeaderCols>
            <DataGridRowMenu displayName="DataGridRowMenu">
                <DataGridRowMenuItem>
                    <button onClick={this.validateRow.bind(this)}>Validate</button>
                </DataGridRowMenuItem>
                <DataGridRowMenuItem>
                    <button>Start Port</button>
                </DataGridRowMenuItem>
                <DataGridRowMenuItem>
                    <button>View Port</button>
                </DataGridRowMenuItem>
                <DataGridRowMenuItem>
                    <button onClick={this.removeRow.bind(this)}>Remove</button>
                </DataGridRowMenuItem>
            </DataGridRowMenu>
            <DataGridToolbar displayName="DataGridToolbar">
                <DataGridToolbarButton>
                    <button id="import-csr-button"><span className="glyphicon glyphicon-import"></span></button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="add-number-button" onClick={this.handleAddNewRow.bind(this)}><span className="glyphicon glyphicon-plus"></span></button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="save-button" onClick={this.handleSave.bind(this)}><span className="glyphicon glyphicon-save"></span></button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="validate-numbers-button" onClick={this.handleValidate.bind(this)}>V</button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="port-numbers-button" onClick={this.handlePorting.bind(this)}>P</button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="setup-trunk-button" onClick={this.handleTrunkCall.bind(this)}>T</button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="add-address-button" onClick={this.handleAddress.bind(this)}>A</button>
                </DataGridToolbarButton>
                <DataGridToolbarButton>
                    <button id="setup-forward-button" onClick={this.handleCallForward.bind(this)}>F</button>
                </DataGridToolbarButton>
            </DataGridToolbar>
        </DataGrid>
      </div>
    );
  }

    handleRowUpdate(index, row) {
        let newData = this.state.data;
        newData[index] = row;
        this.setState({"data": newData})
    }

    removeRow(e) {
        this.handleRowRemove(-1);
    }

    validateRow(e) {
        this.handleRowValidate(0);    
    }

    handleRowRemove(rowIndex) {
        let newData = this.state.data;
        let removedRow = newData.splice(rowIndex, 1);
        if (removedRow[0]["_id"])
            this.handleRemove(removedRow[0]["_id"]);
    }
    
    handleRowSelect(rowIndex) {
        this.selectedCount++;
       this.selectedRowIndex[rowIndex] = true;
    }
    
    rowIsSelected(row) {
        return row
    }
    
    handleSelectAll(checked) {
        this.selectedCount = (checked) ? this.state.data.length : 0;
        
        for(var i=0; i<this.selectedRowIndex.length; i++) {
            this.selectedRowIndex[i] = checked;
        }
    }

    handleRowUnselect(rowIndex) {
        this.selectedCount--;
        this.selectedRowIndex[rowIndex] = false;
    }

    handleRowValidate(rowIndex) {
        var self = this;
        RestService.httpPost('http://localhost:3001/validateNumber/'+this.state.data[rowIndex]["telephone_number"]).then(function(resp) {
			
            self.loadData();
		},function(resp) {
            console.log('errorrrrrrrr in row validate')
        });
    }

    handleAddNewRow() {
        let currData = this.state.data
        
        currData.push({
            "telephone_number":"",
            "number_type": "",
            "number_status": "Identified",
            "btn": "",
            "provider": "",
            "port_status": "",
            "site": "",
            "address": "",
            "da_dl": "",
            "trunk": "",
            "forwarde": ""
        })
        
        this.setState({"data":currData})
    }

    handleSave() {
        var self = this;
        RestService.httpPost('http://localhost:3001/numberDesign', this.state.data).then(function(resp) {
            self.loadData();
		},function(resp) {
            console.log('errorrrrrrrr in save')
        });
    }

    handleRemove(_id) {
        var self = this;
        RestService.httpDelete('http://localhost:3001/removeNumber/'+_id).then(function(resp) {
            self.loadData();
		},function(resp) {
            console.log('errorrrrrrrr in remove')
        });
    }

    handleValidate() {
        alert('[' + this.selectedRowIndex + '] ' + this.selectedCount)
        let numbers = []
        for (var i=0; i<this.selectedRowIndex.length; i++) {
            numbers.push(this.state.data[i]["telephone_number"]);
        }
        var self = this;
        RestService.httpPost('http://localhost:3001/validateNumbers/', numbers).then(function(resp) {
			
            self.loadData();
		},function(resp) {
            console.log('errorrrrrrrr in validate')
        });
    }

    handlePorting() {
        console.log('porting');
    }

    handleTrunkCall() {
        console.log('trunk call');
    }

    handleAddress() {
        console.log('address');
    }

    handleCallForward() {
        console.log('setup call forward');
    }
}

export default App;
