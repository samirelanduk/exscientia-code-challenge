import React from "react";
import PropTypes from "prop-types";

const FileInput = props => {
  /**
   * The interface for providing a file - it overrides the built in file input
   * widget.
   */

  const { icon, ref, onChange, filename, text } = props;

  return (
    <div className="file-input">
      <label for="pdbFile"><img src={icon} alt="icon" /></label>
      <input type="file" id="pdbFile" ref={ref} onChange={onChange} />
      <label>{filename || text}</label>
    </div>
  );
};

FileInput.propTypes = {
  icon: PropTypes.string.isRequired,
  ref: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  filename: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FileInput;