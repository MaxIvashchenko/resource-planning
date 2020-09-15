import React, { Component } from 'react'

import { Container, Draggable } from 'react-smooth-dnd';
// import moment from 'moment';

import arrowIcon from '../../../images/buttonLeft.svg'
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

        this.onDropReady = this.onDropReady.bind(this);
        this.myRef = React.createRef()

        this.state = {
            startDrag: false,
            days: [],
            daysNumber: null,
            dayOffsetLeft: 0,
            daysRowWidth: 0,
            x: 0,
            cellWidth: null,

            board: [
                {
                    departamentName: "BACKEND", show: true, workers: [
                        {
                            id: 'back-1', name: 'Leonid', surname: 'Bondar', department: 'back', projects: [
                                { left: 0, positionY: 1, id: "back-1-1", title: "Startup", projStart: "Aug 15 2020", duration: 2, type: 'main' }
                            ]
                        },
                        {
                            id: 'back-2', name: 'Boris', surname: 'Koval', department: 'back', projects: []
                        },
                        {
                            id: 'back-3', name: 'Afanasy', surname: 'Marchenko', department: 'back', projects: []
                        },
                        {
                            id: 'back-4', name: 'Artur', surname: 'Rudenko', department: 'back', projects: [
                                { left: 240,positionY:1, id: "back-4-1", title: "Manifest", projStart: "Aug 19 2020", duration: 4, type: "education" }
                            ]
                        },
                        {
                            id: 'back-5', name: 'Mikhail', surname: 'Petrenko', department: 'back', projects: []
                        }
                    ]
                },
                {
                    departamentName: "QA", show: true, workers: [
                        {
                            id: 'qa-1', name: 'Leonid', surname: 'Bondar', department: 'qa', projects: [
                                { left: 120,positionY:1, id: "qa-1-1", title: "Startup 1", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                                { left: 131 * 4,positionY:1, id: "qa-1-2", title: "Startup 2", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                            ]
                        },
                        {
                            id: 'qa-2', name: 'Boris', surname: 'Koval', department: 'qa', projects: []
                        },
                        {
                            id: 'qa-3', name: 'Afanasy', surname: 'Marchenko', department: 'qa', projects: []
                        },
                        {
                            id: 'qa-4', name: 'Artur', surname: 'Rudenko', department: 'qa', projects: []
                        }
                    ]
                }
            ]
        }
        // this.daysRowdWith = this.props.size.width - this.state.dayOffsetLeft

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.days !== this.props.days) {
            this.setState({ days: nextProps.days, daysNumber: nextProps.days.length })
        } else if (nextProps.cellWidth !== this.props.cellWidth) {
            this.wert = nextProps.cellWidth && nextProps.cellWidth
            this.setState({ cellWidth: nextProps.cellWidth })
        }
    }
 

    toggler(departamentID) {
        const newArray = [...this.state.board]
        newArray[departamentID] = { ...newArray[departamentID], show: !newArray[departamentID].show }

        this.setState({ board: newArray })
    }

    render() {
        const cellWidth = this.myRef.current && this.myRef.current.offsetWidth/this.state.daysNumber
        // const { cellWidth } = this.state
        // console.log(this.state)
        // const { width, height } = this.props.size
        // console.log('render',cellWidth)
        return (
            <div className="AbsoluteSmooth"  >
                {this.state.board.map((departament, departamentID) => {

                    return (
                        <div key={departament.departamentName + "-" + departamentID} >
                            <div className="departmentTitle">
                                <h5>{departament.departamentName}</h5>
                                <button
                                    onClick={() => this.toggler(departamentID)}
                                    className="departmentBtn"><img className={departament.show ? "show" : "hide"} src={arrowIcon} alt="arrow icon" /></button>
                            </div>

                            <div className={`departmentBlock ${departament.show ? 'showDepartament' : 'hideDepartament'}`}>
                                {departament.workers.map((row, rowIndex) => {

                                    return (
                                        <div className="dayRow" key={row.surname + "-dayRow-" + rowIndex} >
                                            <p>{row.name} {row.surname}</p>
                                            
                                            <div ref={this.myRef} id="inside" className="day" onMouseMove={this.handleMouseMove}>
                                                <Container
                                                
                                                    style={{ position: "relative", height: '100%' }}
                                                    behaviour="drop-zone"
                                                    onDrop={(result) => this.onDrop(result, departamentID, rowIndex,cellWidth)}
                                                    shouldAcceptDrop={(_, payload) => this.shouldAcceptDrop(payload, departamentID, rowIndex,)}
                                                    getChildPayload={(i) => departament.workers[rowIndex].projects[i]}
                                                    // onDragEnter={() => this.onDragEnter(departamentID, rowIndex,)}
                                                    onDragLeave={() => this.onDragLeave(departamentID, rowIndex,)}
                                                    animationDuration='none'
                                                    dropClass='dropClass'
                                                    onDragStart={(result) => this.onDragStart(result, departamentID, rowIndex,)}
                                                    onDragEnd={(result) => this.onDragEnd(result, departamentID, rowIndex, cellWidth)}
                                                // onDropReady={(result) => this.onDropReady(result, departamentID, rowIndex,)}
                                                >
                                                    {row.projects.map((piece, pieceIndex) => <Piece key={'piece ' + pieceIndex} daysNumber={this.state.daysNumber} piece={piece} />)}
                                                </Container>

                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
    componentDidMount() {
        var obj = document.getElementById('inside'); // берем интересующий элемент  

        var dayOffsetLeft = obj.offsetLeft;
        // this.daysRowdWith = this.props.size.width - dayOffsetLeft
        this.setState({ dayOffsetLeft });
    }

    componentWillUpdate(){
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

    onDrop(dropResult, departament, rowIndex,cellWidth) {
        const { addedIndex, removedIndex, payload } = dropResult;
        const obj =   Object.assign({}, payload);

        obj.left  =Math.round(this.state.x /  cellWidth) *  cellWidth
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
