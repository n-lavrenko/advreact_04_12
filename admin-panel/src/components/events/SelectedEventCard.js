import React, { Component } from 'react'
import {DropTarget, DragSource} from 'react-dnd'
import flow from 'lodash.flow'
import {connect} from 'react-redux'
import {addPersonToEvent, EVENT} from '../../ducks/events'

class SelectedEventCard extends Component {
    static propTypes = {

    };

    render() {
        const {event, connectDragSource, connectDropTarget, canDrop, hovered} = this.props
        const dndStyle = {
            border: `1px solid ${canDrop 
                ? hovered 
                    ? 'green' 
                    : 'red'
                : 'black'}`
        }
        return connectDragSource(connectDropTarget(
            <div style = {dndStyle}>
                <h2>{event.title}</h2>
                <p>{event.where}</p>
                <p>{event.when}</p>
            </div>
        ))
    }
}

const specEventSource = {
  beginDrag(props) {
    return {}
  }
}

const collectDrag = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

const spec = {
    drop(props, monitor) {
        props.addPersonToEvent(monitor.getItem().id, props.event.uid)
    },
/*
    canDrop() {
        return false
    }
*/
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
})

export default connect(
    null, { addPersonToEvent }
)(flow(
  DragSource(EVENT, specEventSource, collectDrag),
  DropTarget(['person'], spec, collect)
)(SelectedEventCard))