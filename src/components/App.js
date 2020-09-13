import React, { useState } from "react";
import ProteinViewer from "./ProteinViewer";
import LigandTable from "./LigandTable";
import { sdfToLigands } from "../sdf";
import Ligand2D from "./Ligand2D";
import LigandSelector from "./LigandSelector";
import Options from "./Options";
import LigandsChart from "./LigandsChart";

const App = () => {

  const [pdbFileName, setPdbFileName] = useState("");
  const [pdbContents, setPdbContents] = useState(null);
  const [sdfFileName, setSdfFileName] = useState("");
  const [ligands, setLigands] = useState(null);
  const [selectedLigand, setSelectedLigand] = useState(0);

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
    reader.onload = e => setLigands(sdfToLigands(e.target.result));
  }

  return (
    <div className="app">
      
      <Options
        pdbAdded={pdbAdded} pdbFileName={pdbFileName}
        sdfAdded={sdfAdded} sdfFileName={sdfFileName}
      />

      {pdbContents && ligands && (
        <>
          <ProteinViewer
            pdb={pdbContents} ligands={ligands}
            selectedLigand={selectedLigand} setSelectedLigand={setSelectedLigand}
          />
          <div className="ligands">
            <LigandSelector
              ligands={ligands}
              selectedLigand={selectedLigand}
              setSelectedLigand={setSelectedLigand}
            />
            <LigandTable ligand={ligands[selectedLigand]} />
            <Ligand2D ligand={ligands[selectedLigand]}/>
            <LigandsChart
              ligands={ligands}
              selectedLigand={selectedLigand}
              setSelectedLigand={setSelectedLigand}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;