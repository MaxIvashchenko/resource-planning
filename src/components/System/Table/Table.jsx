import React, { Component } from 'react'

import { Container, Draggable } from 'react-smooth-dnd';
// import moment from 'moment';

import arrowIcon from '../../../images/buttonLeft.svg'

class Table extends Component {
    constructor(props) {
        super(props);

        this.onDrop = this.onDrop.bind(this);
        this.shouldAcceptDrop = this.shouldAcceptDrop.bind(this);
        this.renderPiece = this.renderPiece.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.toggler = this.toggler.bind(this);

        this.onDropReady = this.onDropReady.bind(this);

        this.state = {
            days: [],
            daysNumber: null,

            board: [

                {
                    departamentName: "BACKEND", show: true, workers: [
                        {
                            id: 'back-1', name: 'Leonid', surname: 'Bondar', department: 'back', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: { toUser: "back-1", title: "Startup", projStart: "Aug 15 2020", duration: 2, type: 'main' } },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'back-2', name: 'Boris', surname: 'Koval', department: 'back', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'back-3', name: 'Afanasy', surname: 'Marchenko', department: 'back', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'back-4', name: 'Artur', surname: 'Rudenko', department: 'back', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: { toUser: "back-4", title: "Manifest", projStart: "Aug 19 2020", duration: 4, type: "education" } },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'back-5', name: 'Mikhail', surname: 'Petrenko', department: 'back', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        }
                    ]
                },
                {
                    departamentName: "QA", show: true, workers: [
                        {
                            id: 'qa-1', name: 'Leonid', surname: 'Bondar', department: 'qa', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: { toUser: "qa-1", title: "Startup", projStart: "Aug 15 2020", duration: 2, type: 'main' } },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'qa-2', name: 'Boris', surname: 'Koval', department: 'qa', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'qa-3', name: 'Afanasy', surname: 'Marchenko', department: 'qa', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: {} },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        },
                        {
                            id: 'qa-4', name: 'Artur', surname: 'Rudenko', department: 'qa', days: [
                                { id: "Th-13-August", weekDay: "Th", date: 13, month: "August", year: 2020, projects: {} },
                                { id: "Fr-14-August", weekDay: "Fr", date: 14, month: "August", year: 2020, projects: {} },
                                { id: "Sa-15-August", weekDay: "Sa", date: 15, month: "August", year: 2020, projects: {} },
                                { id: "Su-16-August", weekDay: "Su", date: 16, month: "August", year: 2020, projects: {} },
                                { id: "Mo-17-August", weekDay: "Mo", date: 17, month: "August", year: 2020, projects: {} },
                                { id: "Tu-18-August", weekDay: "Tu", date: 18, month: "August", year: 2020, projects: {} },
                                { id: "We-19-August", weekDay: "We", date: 19, month: "August", year: 2020, projects: { toUser: "qa-4", title: "Manifest", projStart: "Aug 19 2020", duration: 4, type: "education" } },
                                { id: "Th-20-August", weekDay: "Th", date: 20, month: "August", year: 2020, projects: {} }
                            ]
                        }
                    ]
                }


            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.days !== this.props.days) {
            this.setState({ days: nextProps.days, daysNumber: nextProps.days.length })
        }
    }

    renderPiece(item) {

        if (item) {
            return (
                <Draggable style={{ overflow: "visible" }}>
                    <div className={item.type} >
                        <div  className="project">{item.title}</div>
                    </div>
                </Draggable>
            );
        } else {
            return null;
        }
    }

    toggler(departamentID) {
        const newArray = [...this.state.board]
        newArray[departamentID] = { ...newArray[departamentID], show: !newArray[departamentID].show }

        this.setState({ board: newArray })
    }

    render() {

        return (
            <div className="Staff">
                {this.state.board.map((departament, departamentID) => {

                    return (
                        <div key={departament.name+departamentID}>
                            <div className="departmentTitle">
                                <h5>{departament.departamentName}</h5>
                                <button
                                    onClick={() => this.toggler(departamentID)}
                                    className="departmentBtn"><img className={departament.show ? "show" : "hide"} src={arrowIcon} alt="arrow icon" /></button>
                            </div>

                            <div className={`departmentBlock ${departament.show ? 'showDepartament' : 'hideDepartament'}`}>
                                {departament.workers.map((row, rowIndex) => {

                                    return (
                                        <div className="dayRow" key={rowIndex}>
                                            <p>{row.name} {row.surname}</p>

                                            {row.days.map((piece, colIndex) => {

                                                return (
                                                    <div className="day"
                                                        key={`${rowIndex}${colIndex}`}
                                                        style={{ width: `${100 / this.state.daysNumber}%` }}
                                                    >
                                                        <Container
                                                            // style={{ height: '100%' }}
                                                            behaviour="drop-zone"
                                                            onDrop={(result) => this.onDrop(result, departamentID, rowIndex, colIndex)}
                                                            shouldAcceptDrop={(_, payload) => this.shouldAcceptDrop(payload, departamentID, rowIndex, colIndex)}
                                                            getChildPayload={() => ({ colIndex, rowIndex, piece: piece.projects })}
                                                            onDragEnter={() => this.onDragEnter(departamentID, rowIndex, colIndex)}
                                                            onDragLeave={() => this.onDragLeave(departamentID, rowIndex, colIndex)}
                                                            onDropReady={(result) => this.onDropReady(result, departamentID, rowIndex, colIndex)}
                                                        >
                                                            {this.renderPiece(piece.projects)}
                                                        </Container>
                                                    </div>
                                                );
                                            })}
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


    shouldAcceptDrop(payload, departament, rowIndex, colIndex) {

        // const { colIndex: fromCol, rowIndex: fromRow } = payload;
        // const fromPiece = this.state.board[departament].workers[fromRow].days[fromCol];
        // const piece = this.state.board[departament].workers[rowIndex].days[colIndex];

        // if (fromPiece === piece) return true;
        // if (fromPiece.side === piece.side) return false;

        return true;
    }

    onDrop(dropResult, departament, rowIndex, colIndex) {
        const { addedIndex, removedIndex, payload } = dropResult;

        if (addedIndex !== null || removedIndex !== null) {
            if (removedIndex !== null) {
                this.state.board[departament].workers[rowIndex].days[colIndex] = { projects: {} };
            }

            if (addedIndex !== null) {
                this.state.board[departament].workers[rowIndex].days[colIndex].projects = payload.piece;
            }

            this.forceUpdate();
        }
    }

    onDragEnter(departament, row, col) {
        // this.state.board[departament].workers[row].days[col].hover = true;
        // this.forceUpdate();
    }
    onDropReady(dropResult) {
        // const { removedIndex, addedIndex, payload, element } = dropResult;
    }
    onDragLeave(departament, row, col) {
        // this.state.board[departament].workers[row].days[col].hover = false;
        // this.forceUpdate();
    }
}

Table.propTypes = {};

export default Table;
