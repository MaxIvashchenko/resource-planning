import React, { Component } from 'react'
import DatePickerHeader from './DatePickerHeader/DatePickerHeader'
import Table from './Table/Table';
import AbsoluteSmooth from './AbsoluteSmooth/AbsoluteSmooth';
// import Test from './Table/Test';
// import Grid from './Grid/Grid'




export default class System extends Component {
    constructor(props) {
        super(props);

        this.state = {
            daysInRow: [],
            rowWidth: null,
        }

    }


    getDaysInRow = (daysInRow) => {
        this.setState({ daysInRow });
    }
    
    render() {
        
// console.log(cellWidth)
        return (
            <>
                <div className="System container-fluid">
                    <DatePickerHeader   getDaysInRow={this.getDaysInRow} />

                    {/* <div ref={this.ref} className='drag'> Resize me!  </div> */}

                    {/* <Table days={this.state.daysInRow} /> */}
                    <AbsoluteSmooth days={this.state.daysInRow}   />

                    {/* <Test days={this.state.daysInRow} /> */}
                    {/* <ChessApp /> */}
                    {/* <Grid /> */}

                </div>

            </>
        )
    }
}

