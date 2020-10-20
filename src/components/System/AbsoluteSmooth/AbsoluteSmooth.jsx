import React, { Component } from 'react'

import { Container } from 'react-smooth-dnd';
import DepartmentTitle from './DepartmentTitle';
import Piece from './Piece';
import plus from '../../../images/plus.svg'
import PopUp from '../PopUp/PopUp';
import {givePositionY} from './../../lab/givePositionY'


class AbsoluteSmooth extends Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.shouldAcceptDrop = this.shouldAcceptDrop.bind(this);

        this.handlerAddPopUp = this.handlerAddPopUp.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.toggler = this.toggler.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.getInnerProjectOffset = this.getInnerProjectOffset.bind(this);
        
        this.getDaysInRow = this.props.getDaysInRow
        this.onDropReady = this.onDropReady.bind(this);

        this.state = {
            startDrag: false,
            days: [],
            daysNumber: null,
            dayOffsetLeft: 0,
            daysRowWidth: 0,
            x: 0,
            showAddPopUp: false,
            workerInfo: [],
            board: this.props.board,
            innerProjectOffset: 0,
            isEditing: false,
        }


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
    handlerAddPopUp(bol){
        this.setState({ showAddPopUp: bol })
    }

    getWorkersId(departamentID, workerId){
        this.setState({ workerInfo: [departamentID, workerId] })
        // console.log(departamentID, workerId)
        this.handlerAddPopUp(true)
    }
    getInnerProjectOffset(num){
        this.setState({ innerProjectOffset: num })
    }

    render() {

        return (
            <>
                {this.state.showAddPopUp && <PopUp handlerAddPopUp={this.handlerAddPopUp}  workerInfo={this.state.workerInfo} addingInfo={this.props.addingInfo}/>}
                {/* {this.state.isEditing && <PopUp handlerAddPopUp={this.handlerAddPopUp}  workerInfo={this.state.workerInfo} addingInfo={this.props.addingInfo}/>} */}

                { this.state.board.map((departament, departamentID) => {

                    return (

                        <div 
                        // onClick={()=>console.log('click')} 
                        key={departament.departamentName + "-" + departamentID} >

                            <DepartmentTitle departament={departament} departamentID={departamentID} toggler={this.toggler} />

                            <div className={`departmentBlock ${departament.show ? 'showDepartament' : 'hideDepartament'}`}>

                                {/* {this.state.days.map((v, i) => <Lines index={i} cellWidth={ cellWidth}/> )} */}
                                {/* <Lines index={-1} cellWidth={ cellWidth}/> */}

                                {departament.workers.map((row, rowIndex) => {

                                    return (
                                        <div className="dayRow" style={{  height: `${34 * row.blockHeight}px` }} key={row.surname + "-dayRow-" + rowIndex} >
                                            <div className="emploeesName">
                                                <p className="">{row.name} {row.surname}</p>
                                                <button onClick={() => this.getWorkersId(departamentID, rowIndex)}><img src={plus} alt="plus-icon" /></button>
                                            </div>

                                            <div   style={{ width: this.props.rowWidth, height: `${34 * row.blockHeight}px` }} id="inside" className="day" onMouseMove={this.handleMouseMove}>

                                                <Container
                                                    className="thisIsContainer"
                                                    style={{ position: "relative", height: `${34 * row.blockHeight}px` }}
                                                    behaviour="drop-zone"
                                                    onDrop={(result) => this.onDrop(result, departamentID, rowIndex, this.props.cellWidth)}
                                                    shouldAcceptDrop={(_, payload) => this.shouldAcceptDrop(payload, departamentID, rowIndex,)}
                                                    getChildPayload={(i) => departament.workers[rowIndex].projects[i]}
                                                    // onDragEnter={() => this.onDragEnter(departamentID, rowIndex,)}
                                                    onDragLeave={() => this.onDragLeave(departamentID, rowIndex,)}
                                                    animationDuration={'none'}
                                                    // dropClass='dropClass'
                                                    onDragStart={(result) => this.onDragStart(result, departamentID, rowIndex,)}
                                                    onDragEnd={(result) => this.onDragEnd(result, departamentID, rowIndex, this.props.cellWidth)}
                                                // onDropReady={(result) => this.onDropReady(result, departamentID, rowIndex,)}
                                                >

                                                    {row.projects.map((piece, pieceIndex) => {
                                                        return (
                                                            <Piece key={'piece ' + pieceIndex}
                                                                pieceIndex={pieceIndex}
                                                                rowIndex={rowIndex}
                                                                departamentID={departamentID}
                                                                deleteProject={this.props.deleteProject}
                                                                board={this.props.board}
                                                                piece={piece}
                                                                cellWidth={this.props.cellWidth}
                                                                setSomeData={this.props.setSomeData} 
                                                                getInnerProjectOffset={this.getInnerProjectOffset}
                                                                handlerAddPopUp={this.handlerAddPopUp} 
                                                                editProject={this.props.editProject}

                                                                />
                                                        )
                                                    })}
                                                </Container>

                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }
    componentDidMount() {
        var obj = document.getElementById('inside'); // берем интересующий элемент  

        var dayOffsetLeft = obj.offsetLeft;
        // this.daysRowdWith = this.props.size.width - dayOffsetLeft
        this.setState({ dayOffsetLeft });
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

        obj.positionX = Math.round(this.state.x / cellWidth) - 1
        obj.positionY = 0
        if (addedIndex !== null || removedIndex !== null) {


            if (removedIndex !== null) {
                this.state.board[departament].workers[rowIndex].projects.splice(removedIndex, 1)
            }

            if (addedIndex !== null) {
                this.state.board[departament].workers[rowIndex].projects.push(obj);
            }

            this.setState({ startDrag: false, board: givePositionY(this.state.board) });

        }
        this.getInnerProjectOffset(0)
        this.forceUpdate();


    }

    handleMouseMove(event) {

        if (this.state.startDrag) {
        console.log(this.state.innerProjectOffset)
        this.setState({
                x: event.nativeEvent.x - this.state.dayOffsetLeft-this.state.innerProjectOffset
            });
        }
    }

    onDragStart(result, departament, row) {


        this.setState({ startDrag: true });
    }
    onDragEnter(departament, row, col) {

    }
    onDragEnd(departament, row, col) {

    }
    onDropReady(dropResult) {

    }
    onDragLeave(departament, row, col) {

    }
}


AbsoluteSmooth.propTypes = {};
AbsoluteSmooth.defaultProps = {
    // cellWidth: 140,
};

export default (AbsoluteSmooth);
