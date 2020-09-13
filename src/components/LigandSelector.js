import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const LigandSelector = props => {
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

  return (
    <select 
      value={selectedLigand} 
      onChange={e => setSelectedLigand(parseInt(e.target.value))}
    >
      {ligands.map((ligand, index) => (
        <option key={index} value={index}>
          {ligand.properties["Molecule Name"]}
        </option>
      ))}
    </select>
  );
};

LigandSelector.propTypes = {
  
};

export default LigandSelector;