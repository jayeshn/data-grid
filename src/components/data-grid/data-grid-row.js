import React, { Component } from 'react';
import '../../css/menu.css'

class DataGridRow extends Component {
    constructor(props) {
        super(props)
        this.state={
            "previousValue":"",
            "rowData": this.props.rowData
        }
    }

    componentWillMount() {
        this.setState({
            "rowData": this.props.rowData
        });
    }
    
    showMenu(id, e) {
        document.getElementById(id).classList.toggle("show");
    }

    selectRow(id, rowIndex, e) {
        if (e.target.tagName === "TD" || e.target.tagName === "TR") {
            let rowCheckBox = document.getElementById(id)
            rowCheckBox.checked=!rowCheckBox.checked;
            rowCheckBox.value = (rowCheckBox.checked) ? rowIndex : "-1";
            this.props.onRowSelect(rowIndex, rowCheckBox.checked);
        }
        
    }

    selectCheckBox(id, rowIndex, e) {
        let rowCheckBox = document.getElementById(id)
        this.props.onRowSelect(rowIndex, rowCheckBox.checked);
    }
    
    handleRowRemove(rowIndex) {
        this.props.onRowRemove(rowIndex); 
    }
    
    handleRowValidate(rowIndex) {
        this.props.onRowValidate(rowIndex); 
    }

    handleCellChange(name, e) {
        let rd = this.state.rowData;
        rd[name] = e.target.value;
        this.setState({
            "rowData": rd
        });
        
        this.props.onCellChange(this.state.rowData);
    }

    render() {
        return (
            <tr onClick={this.selectRow.bind(this, "check-" + this.props.rowIndex, this.props.rowIndex)}>
                <td className="selectCol"><input checked={this.props.selectedRows[this.props.rowIndex]} onChange={this.selectCheckBox.bind(this, "check-" + this.props.rowIndex, this.props.rowIndex)} id={"check-" + this.props.rowIndex} type="checkbox" /></td>
                <td className="dropdown">
                    <button 
                        onClick={this.showMenu.bind(this, "menu-" + this.props.rowIndex)} 
                        className="dropbtn" 
                        id="row-menu-button"><span className="glyphicon glyphicon-option-horizontal"></span></button>
                    <div id={"menu-" + this.props.rowIndex} className="dropdown-content">
                       <button onClick={this.handleRowValidate.bind(this, this.props.rowIndex)}>Validate</button>
                        <button>Start Port</button>
                        <button>View Port</button>
                        <button onClick={this.handleRowRemove.bind(this, this.props.rowIndex)}>Remove</button>
                        
                    </div>
                </td>
                {
                    this.props.headerCols.map(child => (
                        <td key={child.props.dataField}>
                            <input  type="text" 
                                    value={this.state.rowData[child.props.dataField]} 
                                    onChange={this.handleCellChange.bind(this, child.props.dataField)}
                                    readOnly={child.props.nonEditable}
                                    />
                        </td>)
                    )
                }
            </tr>
        );
    }
}

export default DataGridRow;
