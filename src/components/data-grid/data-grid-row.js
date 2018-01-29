import React, { Component } from 'react';
import '../../css/menu.css'

class DataGridRow extends Component {
    constructor(props) {
        super(props)
        this.state={
            "previousValue":""
        }
    }
  
    editStarted(e) {
        this.setState({"previousValue":e.target.value})
        
        e.stopPropagation();
    }

    editCompleted(rowIndex, e) {
        if (e.target.value !== this.state.previousValue) {
            this.props.onCellChange(rowIndex, e.target.name, e.target.value);
        }

        e.stopPropagation();
    }

    showMenu(id, e) {
        document.getElementById(id).classList.toggle("show");
        e.stopPropagation();
    }

    selectRow(id, rowIndex) {
        let rowCheckBox = document.getElementById(id)
        rowCheckBox.checked=!rowCheckBox.checked;
        rowCheckBox.value = (rowCheckBox.checked) ? rowIndex : "-1";
        this.props.onRowSelect(rowIndex, rowCheckBox.checked);
    }

    selectCheckBox(id, rowIndex, e) {
        let rowCheckBox = document.getElementById(id)
        rowCheckBox.value = (rowCheckBox.checked) ? rowIndex : "-1";
        this.props.onRowSelect(rowIndex, rowCheckBox.checked);
        e.stopPropagation();
    }
    
    handleRowRemove(rowIndex) {
        this.props.onRowRemove(rowIndex); 
    }
    
    handleRowValidate(rowIndex) {
        this.props.onRowValidate(rowIndex); 
    }
    
    render() {
        return (
            <tr onClick={this.selectRow.bind(this, "check-" + this.props.rowIndex, this.props.rowIndex)}>
                <td className="selectCol"><input checked={this.props.selectedRows[this.props.rowIndex]} onClick={this.selectCheckBox.bind(this, "check-" + this.props.rowIndex, this.props.rowIndex)} id={"check-" + this.props.rowIndex} type="checkbox" /></td>
                <td className="dropdown">
                    <button onClick={this.showMenu.bind(this, "menu-" + this.props.rowIndex)} className="dropbtn" id="row-menu-button"><span className="glyphicon glyphicon-option-horizontal"></span></button>
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
                            <input type="text" rowindex={this.props.rowIndex} name={child.props.dataField} defaultValue={this.props.rowData[child.props.dataField]} readOnly={child.props.nonEditable} onFocus={this.editStarted.bind(this)} onBlur={this.editCompleted.bind(this, this.props.rowIndex)}/>
                        </td>)
                    )
                }
            </tr>
        );
    }
}

export default DataGridRow;
