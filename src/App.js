import React, { useState, useRef } from "react";
import proteinIcon from "./images/protein.svg"
import moleculeIcon from "./images/molecule.svg"
import FileInput from "./FileInput";

const App = props => {

  const pdbFileRef = useRef(null);
  const sdfFileRef = useRef(null);
  const [pdbFileName, setPdbFileName] = useState("");
  const [sdfFileName, setSdfFileName] = useState("");

  const fileAdded = () => {}

  return (
    <div>
      <div className="options">
        <div className="inputs">
          <FileInput
            icon={proteinIcon} ref={pdbFileRef} onChange={fileAdded}
            filename={pdbFileName} text="Upload PDB file"
          />
          <FileInput
            icon={moleculeIcon} ref={sdfFileRef} onChange={fileAdded}
            filename={sdfFileName} text="Upload SDF file"
          />
        </div>
      </div>
    </div>
  );
};

export default App;