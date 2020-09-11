import React from "react";
import PropTypes from "prop-types";

const FileInput = props => {
  /**
   * The interface for providing a file - it overrides the built in file input
   * widget.
   */

  const { icon, onChange, id, filename, text } = props;

  return (
    <div className="file-input">
      <label htmlFor={id}><img src={icon} alt="icon" /></label>
      <input type="file" id={id} onChange={onChange} />
      <label>{filename || text}</label>
    </div>
  );
};

FileInput.propTypes = {
  icon: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  filename: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FileInput;