import React, { useEffect, useState } from "react";
import { Stage } from "ngl";
import PropTypes from "prop-types";

const ProteinViewer = props => {
  /**
   * The 3D display.
   */

  const { pdb, ligands, selectedLigand } = props;
  const [stage, setStage] = useState(null);

  useEffect(() => {
    // Create NGL stage if not done so already
    if (!stage) {
      setStage(new Stage("ngl-container", {backgroundColor: "#ffffff"}));
      return;
    }

    // Turn PDB string into file object
    const stringBlob = new Blob([pdb], {type: "application/octet-stream"});

    // Turn ligand PDBs into file objects
    const ligandBlobs = ligands.map(
      ligand => new Blob([ligand.pdb], {type: "application/octet-stream"})
    );

    // Load the protein
    stage.loadFile(stringBlob, {ext: "pdb"}).then((component) => {
      stage.rep = component.addRepresentation("cartoon");
      component.autoView();
    });

    // Load every ligand - store them all but only display one
    stage.components = [];
    ligandBlobs.map((blob, index) => {
      return stage.loadFile(blob, {ext: "pdb"}).then(component => {
        stage.components.push(component);
        if (index === selectedLigand) {
          stage.rep = component.addRepresentation("ball+stick");
          component.autoView();
          stage.currentVisible = index;
        }
      });
    });
  }, [stage])

  useEffect(() => {
    // The selected ligand has changed
    if (stage) {
      stage.rep.parent.removeRepresentation(stage.rep);
      stage.rep = stage.components[selectedLigand].addRepresentation("ball+stick");
    }
  }, [selectedLigand])

  return (
    <div className="protein-viewer">
      <div className="window" id="ngl-container" />
    </div>
  );
};

ProteinViewer.propTypes = {
  pdb: PropTypes.string.isRequired,
  ligands: PropTypes.array.isRequired,
  selectedLigand: PropTypes.number.isRequired,
  setSelectedLigand: PropTypes.func.isRequired
};

export default ProteinViewer;