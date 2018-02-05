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

    componentWillReceiveProps(nextProps) {
        this.setState({
            "rowData": nextProps.rowData
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

    handleCellChange1(name, e) {
        let rd = this.state.rowData;
        rd[name] = e.target.value;
        this.setState({
            "rowData": rd
        });
        
        this.props.onCellChange(this.state.rowData);
    }

    handleCellChange(name, value) {
        let rd = this.state.rowData;
        rd[name] = value;
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
                           <CellControl   cellData={this.state.rowData[child.props.dataField]}
                                          dataField={child.props.dataField}
                                          readOnly={child.props.nonEditable}
                                          fieldType={child.props.fieldType}
                                          enumValues={child.props.enumValues}
                                          validationPattern={child.props.validationPattern}
                                          onCellChange={this.handleCellChange.bind(this)}
                                          key={child.props.dataField}/>
                            
                        </td>)
                    )
                }
            </tr>
        );
    }
}

class CellControl extends Component {
    onBlur(e) {
    /*    var el = e.target
        var b = el.checkValidity();
        console.log(b);
        if (!b) {
            el.classList.add('error');
            e.preventDefault();
            el.focus();
        } else {
            el.classList.remove('error');
        }*/
    }

    handleCellChange(dataField, e) {
        var el = e.target
        var b = el.checkValidity();
        console.log(b);
        if (!b) {
            el.classList.add('error');
        } else {
            el.classList.remove('error');
        }
            this.props.onCellChange(dataField, e.target.value);
    }

    render() {
        var control = (<div/>);
        switch(this.props.fieldType) {
            case 'enum':
                control = (
                    <select value={this.props.cellData} 
                            onChange={this.handleCellChange.bind(this, this.props.dataField)}>{this.props.enumValues.map((enumValue, index) => (<option key={index} value={enumValue.value}>{enumValue.display}</option>))}
                    </select>)
                break;
            default:
                control = (<input   type="text" 
                                    pattern={this.props.validationPattern}
                                    value={this.props.cellData} 
                                    onChange={this.handleCellChange.bind(this, this.props.dataField)}
                                    onBlur={this.onBlur.bind(this)}
                                    readOnly={this.props.nonEditable}
                        />)
        }
        
        return (<span>{control}</span>)
    }
}

export default DataGridRow;
