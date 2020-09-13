import React, { useEffect } from "react";
import { Stage } from "ngl";
import PropTypes from "prop-types";

const ProteinViewer = props => {
  /**
   * The 3D display.
   */

  const { pdb, ligands } = props;

  useEffect(() => {
    // Create NGL stage
    const stage = new Stage("ngl-container", {backgroundColor: "#ffffff"});

    // Turn PDB string into file object
    const stringBlob = new Blob([pdb], {type: "application/octet-stream"});

    // Turn ligand PDBs into file objects
    const ligandBlobs = ligands.map(
      ligand => new Blob([ligand], {type: "application/octet-stream"})
    );

    stage.loadFile(stringBlob, {ext: "pdb"}).then((component) => {
      stage.rep = component.addRepresentation("cartoon");
      component.autoView();
    });
    stage.loadFile(ligandBlobs[0], {ext: "pdb"}).then((component) => {
      stage.rep = component.addRepresentation("ball+stick");
      component.autoView();
    });
  })

  return (
    <div className="protein-viewer">
      <div className="window" id="ngl-container" />
    </div>
  );
};

ProteinViewer.propTypes = {
  pdb: PropTypes.string.isRequired,
  ligands: PropTypes.array.isRequired,
};

export default ProteinViewer;