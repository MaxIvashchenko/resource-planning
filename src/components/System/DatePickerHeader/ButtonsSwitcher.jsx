import React, { Component } from 'react'
import btnR from '../../../images/buttonRight.svg'
import btnL from '../../../images/buttonLeft.svg'

export default class ButtonsSwitcher extends Component {
    constructor(props) {
        super(props);
        this.nameOfClass = this.props.nameOfClass
    }

    render() {
        return (
            <div className={this.nameOfClass}>
                <button onClick={() => this.props.handler(false)} ><img src={btnL} alt="button-icon" /></button>
                {this.props.children}
                <button onClick={() => this.props.handler(true)} ><img src={btnR} alt="button-icon" /></button>
            </div>

        )
    }
}
