import React, { Component } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TestContainer from './Test/TestContainer'
import CustomDragLayer from './Test/CustomDragLayer'


export default class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            daysNumber: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.days !== this.props.days) {
            this.setState({ days: nextProps.days, daysNumber: nextProps.days.length })
        }
    }

    render() {


        return (
            <div className="Test">
                <DndProvider backend={HTML5Backend}>
                    <TestContainer days={this.state.days} daysNumber={this.state.daysNumber} />
                    <CustomDragLayer days={this.state.days} daysNumber={this.state.daysNumber} />
                </DndProvider>
            </div>
        )
    }
}
