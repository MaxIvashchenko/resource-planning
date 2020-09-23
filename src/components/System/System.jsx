import React, { Component } from 'react'
import DatePickerHeader from './DatePickerHeader/DatePickerHeader'
// import Table from './Table/Table';
import AbsoluteSmooth from './AbsoluteSmooth/AbsoluteSmooth';
import Lines from './AbsoluteSmooth/Lines';
import CalculateData from './AbsoluteSmooth/CalculateData';
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

    getRowWidth = (rowWidth) => {
        this.setState({ rowWidth });
    }



    render() {


        return (
            <>
                <div className="System container-fluid">
                    <DatePickerHeader getDaysInRow={this.getDaysInRow} getRowWidth={this.getRowWidth} />

                    {/* <div ref={this.ref} className='drag'> Resize me!  </div> */}

                    {/* <Table days={this.state.daysInRow} /> */}
                    <div className="AbsoluteSmooth"  >

                        <CalculateData daysInRow={this.state.daysInRow} rowWidth={this.state.rowWidth} />


                        {this.state.daysInRow.map((v, i) => <Lines index={i} cellWidth={this.state.rowWidth / this.state.daysInRow.length} />)}
                        <Lines index={-1} cellWidth={this.state.rowWidth / this.state.daysInRow.length} />
                    </div>

                    {/* <Test days={this.state.daysInRow} /> */}
                    {/* <ChessApp /> */}
                    {/* <Grid /> */}

                </div>

            </>
        )
    }
}

