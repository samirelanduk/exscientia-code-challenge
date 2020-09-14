import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import proteinIcon from "../images/protein.svg"
import moleculeIcon from "../images/molecule.svg"
import FileInput from "./FileInput";

const Options = props => {
  /**
   * The data input for the tool.
   */

  const { pdbAdded, pdbFileName, sdfAdded, sdfFileName } = props;

  const className = classNames({
    options: true, smaller: pdbFileName && sdfFileName
  })
  
  return (
    <div className={className}>
      <div className="inputs">
        <FileInput
          icon={proteinIcon} onChange={pdbAdded} id="pdbFile"
          filename={pdbFileName} text="Upload PDB file" fileTypes=".pdb"
        />
        <FileInput
          icon={moleculeIcon} onChange={sdfAdded} id="sdfFile"
          filename={sdfFileName} text="Upload SDF file" fileTypes=".sdf"
        />
      </div>
    </div>
  );
};

Options.propTypes = {
  pdbAdded: PropTypes.func.isRequired,
  pdbFileName: PropTypes.string.isRequired,
  sdfAdded: PropTypes.func.isRequired,
  sdfFileName: PropTypes.string.isRequired
};

export default Options;