import React, { Component } from 'react'

export default  class Lines extends Component {
    constructor(props) {
        super(props)
        this.daysNumber = this.props.daysNumber
        this.days = this.props.days

    }
    render() {
        return (
            <div className='svgLines' style={{}}>
                {this.props.days.map((v, i) => {
                    return (
                        <svg key={v + "-" + i} width={`${100 / this.props.daysNumber}%`} height="100%" version="1.1" >
                            <line x1="0" y1="100%" stroke="black" fill="transparent" strokeDasharray="4" strokeWidth="1" />
                            <line x1="100%" x2="100%" y1="100%" stroke="black" fill="transparent" strokeDasharray="4" strokeWidth="1" />
                            {/* <line y1="0" x2="100%" stroke="black" fill="transparent" strokeDasharray="4" strokeWidth="1" /> */}
                            <line y1="100%" y2="100%" x2="100%" stroke="black" fill="transparent" strokeDasharray="4" strokeWidth="1" />
                        </svg>
                    )
                })}
            </div>
        )
    }
}
