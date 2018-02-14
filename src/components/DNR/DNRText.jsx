import React from 'react';
import PropTypes from 'prop-types';
import withDNR from './withDNR';
import cx from 'classnames';
import { Editor, RichUtils } from 'draft-js';
import './DNR.scss';

const Text = ({
  className,
  isActive,
  onTextChange,
  content,
  placeholder,
  onClick,
  ...props
}) => {

  const baseClass = "canvas_text"
  const classes = cx(
    className,
    baseClass,
    { [`${baseClass}--active`]: isActive }
  )

  const handleTextKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onTextChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  return (
    <div className={classes} onClick={onClick}>
      <Editor
        { ...props }
        handleKeyCommand={handleTextKeyCommand}
        editorState={content}
        onChange={onTextChange}
        placeholder={ placeholder || "Write something..."}
      />
    </div>
  );
};

Text.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
  onTextChange: PropTypes.func,
  content: PropTypes.any,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};

Text.defaultProps = {
  isActive: false,
  onChange: () => {}
};

export default withDNR(Text);
