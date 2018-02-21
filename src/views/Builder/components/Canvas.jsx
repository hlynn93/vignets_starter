import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DNRImage, DNRText } from '../../../components/DNR';
import { ASPECT_RATIO, OBJECT_TYPES } from '../../../constants/appConstants';


import './Canvas.scss';

class Canvas extends PureComponent {

  constructor(props) {
    super(props);
    this.renderObjects = this.renderObjects.bind(this)
  }

  componentWillMount() {
    document.addEventListener("keydown", this.props.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.props.onKeyDown);
  }

  renderObjects() {
    const {
      objectIds,
      objects,
      onObjectClick,
      onTextChange,
      onDragStop,
      onResizeStop,
      onKeyDown,
      onBlur,
      onFocus,
      activeId
    } = this.props
    return objectIds.map(id => {

      const object = objects[id]
      const objectProps = {
        onKeyDown: onKeyDown,
        onDragStop: onDragStop.bind(null, id),
        onResizeStop: onResizeStop.bind(null, id),
        isActive: id === activeId,
        onClick: onObjectClick.bind(null, id),
        object,
        key: id,
        id: `canvas_object--${id}`,
        className: `canvas_object canvas_object--${id}`
      }

      switch (object.type) {
        case OBJECT_TYPES.IMAGE:
          return (
            <DNRImage
              {...objectProps }
              />
          )

        case OBJECT_TYPES.TEXT:
          return (
            <DNRText
              onTextChange={onTextChange.bind(null, id)}
              onBlur={onBlur}
              onFocus={onFocus}
              {...objectProps}
            />
          )

        default: return null;
      }
    })
  }

  render() {
    const { mode, onCanvasClick } = this.props

    const canvasStyle = ASPECT_RATIO[mode]

    return (
      <div className="canvas_wrapper" onClick={onCanvasClick}>
        <div id="canvas" className="canvas" style={canvasStyle}>
          { this.renderObjects() }
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  objectIds: PropTypes.array,
  objects: PropTypes.object,
  onObjectClick: PropTypes.func,
  onTextChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onCanvasClick: PropTypes.func,
  onDragStop: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onResizeStop: PropTypes.func,
  activeId: PropTypes.string,
  mode: PropTypes.string,
};

export default Canvas;
