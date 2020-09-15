import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import '../../../../node_modules/react-grid-layout/css/styles.css'
import '../../../../node_modules/react-resizable/css/styles.css'

const ReactGridLayout = WidthProvider(RGL);

export default class ErrorCaseLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 7,
    rowHeight: 100,
    onLayoutChange: function () { },
    cols: 8
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    const layout2 = this.generateLayout2();
    this.state = { layout,layout2 };
  }

  generateDOM() {
    return [
      <div key={"1"} style={{ background: 'white' }}>
        <span className="text">{"1"}</span>
      </div>,
      <div key={"2"} style={{ background: 'white' }}>
        <span className="text">{"2"}</span>
      </div>,
      <div key={"3"} style={{ background: 'white' }}>
        <span className="text">{"3"}</span>
      </div>
    ];
  }
  generateDOM2() {
    return [
      <div key={"11"} style={{ background: 'white' }}>
        <span className="text">{"rew"}</span>
      </div>,
      <div key={"22"} style={{ background: 'white' }}>
        <span className="text">{"22"}</span>
      </div>,
      <div key={"33"} style={{ background: 'white' }}>
        <span className="text">{"eweee"}</span>
      </div>
    ];
  }

  generateLayout() {
    return [
      { x: 0, y: 0, w: 1, h: 1, i: "1" ,minH: 1 ,maxH:1 },
      { x: 4, y: 1, w: 2, h: 1, i: "2",minH: 1 ,maxH:1 },
      { x: 0, y: 1, w: 2, h: 1, i: "3" ,minH: 1 ,maxH:1 },
    ];
  }
  generateLayout2() {
    return [
      { x: 0, y: 0, w: 1, h: 1, i: "11" },
      { x: 1, y: 6, w: 1, h: 1, i: "22" },
      { x: 1, y: 1, w: 3, h: 2, i: "33" }
    ];
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }
  onDrop = (layout, layoutItem, event) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
console.log(layout, layoutItem, event)
  };

  show=(e) => {
    console.log(e)
  }
  render() {
    return (
      <>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => this.show(e)}
        >
          Droppable Element (Drag me!)
        </div>
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
          style={{ background: 'red' }}
          onDrop={this.onDrop}
          onDragStart={e => this.show(e)}
          isDroppable={true}

        >
          {this.generateDOM()}
        </ReactGridLayout>
        <ReactGridLayout
          layout={this.state.layout2}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
          style={{ background: 'red' }}
          onDrop={this.onDrop}
          onDragStart={e => this.show(e)}
          onDrag={e => this.show(e)}
          isDroppable={true}
        >
          {this.generateDOM2()}
        </ReactGridLayout>
      </>
    );
  }
}
