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
    }

    editCompleted(rowIndex, e) {
        if (e.target.value !== this.state.previousValue) {
            this.props.onCellChange(rowIndex, e.target.name, e.target.value);
        }
    }

    showMenu(id) {
        document.getElementById(id).classList.toggle("show");
    }

    removeRow(index) {
        this.props.onRowRemove(index);
    }

    render() {
        return (
            <tr>
                <td className="selectCol"><input type="checkbox" /></td>
                <td className="dropdown">
                    <button onClick={this.showMenu.bind(this, "menu-" + this.props.rowIndex)} className="dropbtn" id="row-menu-button"><span className="glyphicon glyphicon-option-horizontal"></span></button>
                    <div id={"menu-" + this.props.rowIndex} className="dropdown-content">
                        <button>Validate</button>
                        <button>Start Port</button>
                        <button>View Port</button>
                        <button onClick={this.removeRow.bind(this, this.props.rowIndex)}>Remove</button>
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
