import React from "react";
import PropTypes from "prop-types";
import proteinIcon from "../images/protein.svg"
import moleculeIcon from "../images/molecule.svg"
import FileInput from "./FileInput";

const Options = props => {

  const { pdbAdded, pdbFileName, sdfAdded, sdfFileName } = props;
  
  return (
    <div className="options">
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
  
};

export default Options;