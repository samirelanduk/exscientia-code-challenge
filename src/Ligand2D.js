import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Kekule from "kekule";

const Ligand2D = props => {
  /**
   * A 2-dimensional ligand viewer. It uses Kekula.
   */

  const { ligand } = props;

  useEffect(() => {
    const molecule = Kekule.IO.loadFormatData(ligand.sdfString, "mol3k");
    const chemViewer = new Kekule.ChemWidget.Viewer(
      document.getElementById("kekulaViewer")
    );
    chemViewer.setChemObj(molecule);
  })

  return (
    <div className="ligand-2D">
      <div id="kekulaViewer" data-widget="Kekule.ChemWidget.Viewer2D"/>
    </div>
  );
};

Ligand2D.propTypes = {
  ligand: PropTypes.object.isRequired
};

export default Ligand2D;