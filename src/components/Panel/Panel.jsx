import React from 'react';
import Rnd from 'react-rnd';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './Panel.scss';

const Panel = ({
  position,
  onDrag,
  onDragStart,
  onDragStop,
  bounds,
  className,
  disableDragging,
  disableMinimize,
  onToggle,
  minimize,
  children,
  ...props,
}) => {

  const classes = cx(
    'panel',
    className
  )
  return (
    <Rnd
      className={classes}
      default={position}
      bounds={bounds}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      disableDragging={disableDragging}
      enableResizing={false}
      dragHandleClassName={".panel_header"}
      {...props}
      >
      {
        !disableMinimize &&
        <div className="panel_header">
          <div
            className="panel_header_controls"
            onClick={onToggle}>
            {minimize ? "+" : "-"}
          </div>
        </div>
      }

      <div
        className="panel_body"
        style={minimize ? { display: 'none'} : {}}
        >
        {children}
      </div>
    </Rnd>
  );
};

Panel.propTypes = {
  onDrag: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  bounds: PropTypes.string,
  disableDragging: PropTypes.bool,
  onToggle: PropTypes.func,
  minimize: PropTypes.bool,
  disableMinimize: PropTypes.bool,
  position: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

Panel.defaultProps = {
  disableDragging: false,
  bounds: '.builder',
}

export default Panel;
