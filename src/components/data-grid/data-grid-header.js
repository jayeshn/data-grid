import React, { Component } from 'react';
import Modeless from '../common/modeless'
import '../../css/menu.css'

class DataGridHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "showMenu": false,
            x:-1,
            y:-1
        }
    }

    handleMenuClick(e) {
        let coord = this.getCoordinates('menu-button');
        
        this.setState({"showMenu":!this.state.showMenu, "x": coord.x, "y": coord.y});
    }

    getCoordinates(id) {
        let buttonEl = document.getElementById(id);
        let x = buttonEl.offsetLeft + buttonEl.offsetWidth;
        let y = buttonEl.offsetTop + buttonEl.offsetHeight;
        
        return {"x":x, "y":y};
    }

    render() {
        const tableContextMenu = this.state.showMenu ? (
            <Modeless root="menu-parent" x={this.state.x} y={this.state.y}>
                <div className="menu">
                    <div className="menu-item">
                        911 Address Details
                    </div>
                </div>
            </Modeless>
            ) : null;

        return (
            <thead>
                <tr>
                    <th className="selectCol"><input type="checkbox" /></th>
                    <th className="menuCol"><div id="menu-parent"><button id="menu-button" type="button" onClick={this.handleMenuClick.bind(this)}>Mwnu</button></div>{tableContextMenu}</th>
                    {this.props.headerCols.map(header => (<th>{header.props.children}</th>))}
                </tr>
            </thead>
        );
    }
}

export default DataGridHeader;
