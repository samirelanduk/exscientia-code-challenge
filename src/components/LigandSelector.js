import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const LigandSelector = props => {
  /**
   * A widget for selecting the current ligand.
   */

  const { ligands, selectedLigand, setSelectedLigand } = props;

  const options = ligands.map((ligand, index) => ({
    value: index, label: ligand.properties["Molecule Name"]
  }));

  return (
    <Select
      name="colors"
      options={options}
      value={options[selectedLigand]}
      onChange={e => setSelectedLigand(e.value)}
      classNamePrefix="select"
      className="ligand-selector"
    />
  )
};

LigandSelector.propTypes = {
  ligands: PropTypes.array.isRequired,
  selectedLigand: PropTypes.number.isRequired,
  setSelectedLigand: PropTypes.func.isRequired
};

export default LigandSelector;