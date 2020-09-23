import React, { Component } from 'react'

import { Container, Draggable } from 'react-smooth-dnd';
import DepartmentTitle from './DepartmentTitle';
// import moment from 'moment';

import Lines from './Lines';
// import sizeMe from 'react-sizeme'
import Piece from './Piece';



class AbsoluteSmooth extends Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.shouldAcceptDrop = this.shouldAcceptDrop.bind(this);

        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.toggler = this.toggler.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this.getDaysInRow = this.props.getDaysInRow
        this.onDropReady = this.onDropReady.bind(this);
        this.myRef = React.createRef()
        this.cellWidth = this.props.cellWidth

        this.state = {
            startDrag: false,
            days: [],
            daysNumber: null,
            dayOffsetLeft: 0,
            daysRowWidth: 0,
            x: 0,


            board: this.props.board
        }
        // this.daysRowdWith = this.props.size.width - this.state.dayOffsetLeft

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.days !== this.props.days) {
            this.setState({ days: nextProps.days, daysNumber: nextProps.days.length })
        } 
    }


    toggler(departamentID) {
        const newArray = [...this.state.board]
        newArray[departamentID] = { ...newArray[departamentID], show: !newArray[departamentID].show }

        this.setState({ board: newArray })
    }

    render() {
        const cellWidth = this.myRef.current && this.myRef.current.offsetWidth / this.state.daysNumber
        this.cellWidth = cellWidth
        // console.log(this.myRef.current && this.myRef.current.offsetWidth)
        // const { cellWidth } = this.state
        // console.log(this.state)
        // const { width, height } = this.props.size
        // console.log('render',cellWidth)
        return (


            this.state.board.map((departament, departamentID) => {

                return (

                    <div key={departament.departamentName + "-" + departamentID} >

                        <DepartmentTitle departament={departament} departamentID={departamentID} toggler={this.toggler} />

                        <div className={`departmentBlock ${departament.show ? 'showDepartament' : 'hideDepartament'}`}>

                            {/* {this.state.days.map((v, i) => <Lines index={i} cellWidth={ cellWidth}/> )} */}
                            {/* <Lines index={-1} cellWidth={ cellWidth}/> */}

                            {departament.workers.map((row, rowIndex) => {

                                return (
                                    <div className="dayRow" key={row.surname + "-dayRow-" + rowIndex} >
                                        <p className="emploeesName">{row.name} {row.surname}</p>

                                        <div ref={this.myRef} id="inside" className="day" onMouseMove={this.handleMouseMove}>

                                            <Container

                                                style={{ position: "relative", height: '100%' }}
                                                behaviour="drop-zone"
                                                onDrop={(result) => this.onDrop(result, departamentID, rowIndex, this.cellWidth)}
                                                shouldAcceptDrop={(_, payload) => this.shouldAcceptDrop(payload, departamentID, rowIndex,)}
                                                getChildPayload={(i) => departament.workers[rowIndex].projects[i]}
                                                // onDragEnter={() => this.onDragEnter(departamentID, rowIndex,)}
                                                onDragLeave={() => this.onDragLeave(departamentID, rowIndex,)}
                                                animationDuration={'none'}
                                                dropClass='dropClass'
                                                onDragStart={(result) => this.onDragStart(result, departamentID, rowIndex,)}
                                                onDragEnd={(result) => this.onDragEnd(result, departamentID, rowIndex, this.cellWidth)}
                                            // onDropReady={(result) => this.onDropReady(result, departamentID, rowIndex,)}
                                            >

                                                {row.projects.map((piece, pieceIndex) => <Piece key={'piece ' + pieceIndex} daysNumber={this.state.daysNumber} piece={piece} cellWidth={this.cellWidth}/>)}
                                            </Container>

                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            })

        );
    }
    componentDidMount() {
        var obj = document.getElementById('inside'); // берем интересующий элемент  

        var dayOffsetLeft = obj.offsetLeft;
        // this.daysRowdWith = this.props.size.width - dayOffsetLeft
        this.setState({ dayOffsetLeft });
    }

    componentWillUpdate() {
        // console.log(this.myRef.current.offsetWidth)

    }

    shouldAcceptDrop(payload, departament, rowIndex, colIndex) {

        // const { colIndex: fromCol, rowIndex: fromRow } = payload;
        // const fromPiece = this.state.board[departament].workers[fromRow].days[fromCol];
        // const piece = this.state.board[departament].workers[rowIndex].days[colIndex];

        // if (fromPiece === piece) return true;
        // if (fromPiece.side === piece.side) return false;

        return true;
    }

    onDrop(dropResult, departament, rowIndex, cellWidth) {
        const { addedIndex, removedIndex, payload } = dropResult;
        const obj = Object.assign({}, payload);
console.log(cellWidth)
        obj.left = Math.round(this.state.x / cellWidth) * cellWidth
        // console.log('onDrop',this.state.x, obj.left)

        if (addedIndex !== null || removedIndex !== null) {


            if (removedIndex !== null) {

                this.state.board[departament].workers[rowIndex].projects.splice(removedIndex, 1)
            }

            if (addedIndex !== null) {

                this.state.board[departament].workers[rowIndex].projects.push(obj);
            }

            this.setState({ startDrag: false });
            // this.forceUpdate();
        }
    }

    handleMouseMove(event) {
        if (this.state.startDrag) {
            this.setState({
                x: event.nativeEvent.x - this.state.dayOffsetLeft
            });
        }
    }

    onDragStart(result, departament, row) {
        // this.state.board[departament].workers[row].days[col].hover = true;
        // console.log(result, departament, row)

        this.setState({ startDrag: true });
        // this.forceUpdate();
    }
    onDragEnter(departament, row, col) {
        // this.state.board[departament].workers[row].days[col].hover = true;
        // this.forceUpdate();
    }
    onDragEnd(departament, row, col) {
        // this.state.board[departament].workers[row].days[col].hover = true;
        // this.forceUpdate();

        // console.log('onDragEnd',this.state.x)

    }
    onDropReady(dropResult) {
        // const { removedIndex, addedIndex, payload, element } = dropResult;
    }
    onDragLeave(departament, row, col) {
        // console.log(departament, row)
        // this.state.board[departament].workers[row].days[col].hover = false;
        // this.forceUpdate();
    }
}


AbsoluteSmooth.propTypes = {};
AbsoluteSmooth.defaultProps = {
    // cellWidth: 140,
};

export default (AbsoluteSmooth);
