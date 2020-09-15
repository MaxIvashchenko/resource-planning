import React, { Component } from 'react'

export class Box extends Component {

  constructor(props) {
    super(props)

    this.title = props.title
    this.yellow = props.yellow
    this.duration = props.duration
    this.cellWidth = props.cellWidth

  }

   // componentDidMount() {
    //     const element = this.ref.current;
    //     element.addEventListener('resize', (event) => console.log(event.detail));
    //     function checkResize(mutations) {
    //         const el = mutations[0].target;
    //         const w = el.clientWidth;
    //         const h = el.clientHeight;

    //         const isChange = mutations
    //             .map((m) => `${m.oldValue}`)
    //             .some((prev) => prev.indexOf(`width: ${w}px`) === -1 || prev.indexOf(`height: ${h}px`) === -1);

    //         if (!isChange) { return; }
    //         const event = new CustomEvent('resize', { detail: { width: w, height: h } });
    //         el.dispatchEvent(event);
    //     }
    //     const observer = new MutationObserver(checkResize);
    //     observer.observe(element, { attributes: true, attributeOldValue: true, attributeFilter: ['style'] });
    // }

  render() {
    const backgroundColor = this.yellow ? 'yellow' : 'rgb(139, 245, 139)'

    return (
      <div   className="cell drag" style={{ width: this.cellWidth * this.duration, backgroundColor }}>
        <p>{this.title}</p>
      </div>
    )
  }
}
