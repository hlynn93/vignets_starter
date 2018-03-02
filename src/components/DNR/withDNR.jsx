/**
 * HOC to inject Drag and Resize property to the component
 */
import React from 'react';
import Rnd from 'react-rnd';
import cx from 'classnames';
import { isUndefined } from 'lodash';
import { IMAGE_TOOL_TYPE } from '../../constants/builderConstants';
import Transition from '../../components/Transition';

/* eslint-disable */

export default (Component) => {
  return ({
    className,
    id,
    isActive,
    onKeyDown,
    onDrag,
    onDragStart,
    onDragStop,
    onResize,
    onResizeStart,
    onResizeStop,
    bounds,
    disableDragging,
    enableResizing,
    object,
    style,
    inProp,
    transition,
    ...props
  }) => {

    const { attr } = object;

    console.warn(transition, id);

    const componentStyle = !isUndefined(attr[IMAGE_TOOL_TYPE.ROTATION]) ? {
      transform: `rotate(${attr.rotation}deg)`
    } : {};

    const baseClass = "dnr_object"
    const classes = cx(
      baseClass,
      { [`${baseClass}--active`]: isActive }
    )

    return (
      <Rnd
        style={style}
        default={attr}
        position={attr}
        bounds={bounds || 'parent'}
        onResizeStart={onResizeStart}
        onResize={onResize}
        onResizeStop={onResizeStop}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragStop={onDragStop}
        enableResizing={enableResizing}
        disableDragging={disableDragging}
        className={classes}
        >
        <Transition {...transition}>
          <Component
            onKeyDown={onKeyDown}
            style={componentStyle}
            {...object}
            {...props} />
        </Transition>
      </Rnd>)
  }
}
