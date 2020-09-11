import React, { useState } from "react";
import proteinIcon from "./images/protein.svg"
import moleculeIcon from "./images/molecule.svg"
import FileInput from "./FileInput";
import ProteinViewer from "./ProteinViewer";

const App = () => {

  const [pdbFileName, setPdbFileName] = useState("");
  const [pdbContents, setPdbContents] = useState(null);
  const [sdfFileName, setSdfFileName] = useState("");
  const [sdfContents, setSdfContents] = useState(null);

  const pdbAdded = e => {
    /**
     * The user has selected a PDB file - get the filename and contents from it
     * and update state accordingly.
     */

    const file = e.target.files[0];
    setPdbFileName(file.name);
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => setPdbContents(e.target.result);
  }

  const sdfAdded = e => {
    /**
     * The user has selected a SDF file - get the filename and contents from it
     * and update state accordingly.
     */

    const file = e.target.files[0];
    setSdfFileName(file.name);
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => setSdfContents(e.target.result);
  }

  return (
    <div>
      <div className="options">
        <div className="inputs">
          <FileInput
            icon={proteinIcon} onChange={pdbAdded} id="pdbFile"
            filename={pdbFileName} text="Upload PDB file"
          />
          <FileInput
            icon={moleculeIcon} onChange={sdfAdded} id="sdfFile"
            filename={sdfFileName} text="Upload SDF file"
          />
        </div>
      </div>

      {pdbContents && sdfContents && (
        <ProteinViewer pdb={pdbContents} />
      )}
    </div>
  );
};

export default App;