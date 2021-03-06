import React, { useEffect, useState } from "react";
import { Stage } from "ngl";
import PropTypes from "prop-types";

const ProteinViewer = props => {
  /**
   * The 3D display.
   */

  const { pdb, ligands, selectedLigand, ligandRep, targetRep } = props;
  const [stage, setStage] = useState(null);

  useEffect(() => {
    // Create NGL stage if not done so already
    if (!stage) {
      setStage(new Stage("ngl-container", {backgroundColor: "#ffffff00"}));
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
      stage.targetRep = component.addRepresentation(targetRep, {opacity: 0.65});
      component.autoView();
      stage.targetComponent = component;
    });

    // Load every ligand - store them all but only display one
    stage.components = [];
    ligandBlobs.map((blob, index) => {
      return stage.loadFile(blob, {ext: "pdb"}).then(component => {
        stage.components.push(component);
        if (index === selectedLigand) {
          stage.rep = component.addRepresentation(ligandRep);
          component.autoView();
          stage.currentVisible = index;
        }
      });
    });

    // If the screen changes size, deal with it
    const handleResize = () => stage.handleResize();
    window.addEventListener("orientationchange", handleResize, false);
    window.addEventListener("resize", handleResize, false);
  }, [stage]);

  useEffect(() => {
    // The selected ligand or ligand view has changed
    if (stage) {
      stage.rep.parent.removeRepresentation(stage.rep);
      stage.rep = stage.components[selectedLigand].addRepresentation(ligandRep);
    }
  }, [selectedLigand, ligandRep]);

  useEffect(() => {
    // The target view has changed
    if (stage) {
      stage.targetRep.parent.removeRepresentation(stage.targetRep);
      stage.targetRep = stage.targetComponent.addRepresentation(targetRep, {opacity: 0.65});
    }
  }, [targetRep])

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
  ligandRep: PropTypes.string.isRequired,
  targetRep: PropTypes.string.isRequired,
};

export default ProteinViewer;