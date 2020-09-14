import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const ProteinViewOptions = props => {
  /**
   * An interface for changing how the 3D display looks.
   */

  const { ligandRep, setLigandRep, targetRep, setTargetRep } = props;

  const ligandReps = [{
    value: "ball+stick", label: "Ball and Stick",
  }, {
    value: "spacefill", label: "Spacefilling",
  }, {
    value: "hyperball", label: "Hyperball",
  }];

  const targetReps = [{
    value: "cartoon", label: "Cartoon",
  }, {
    value: "line", label: "Lines",
  }, {
    value: "ball+stick", label: "Ball and Stick",
  }, {
    value: "spacefill", label: "Spacefilling",
  }];

  return (
    <div className="protein-view-options">
      <div className="option">
        <label>Ligand</label>
        <Select
          options={ligandReps}
          value={ligandReps.filter(r => r.value === ligandRep)[0]}
          onChange={e => setLigandRep(e.value)}
          classNamePrefix="select"
          className="ligand-rep-selector"
          menuPlacement="top"
        />
      </div>
      
      <div className="option">
        <label>Target</label>
        <Select
          options={targetReps}
          value={targetReps.filter(r => r.value === targetRep)[0]}
          onChange={e => setTargetRep(e.value)}
          classNamePrefix="select"
          className="target-rep-selector"
          menuPlacement="top"
        />
      </div>
    </div>
  );
};

ProteinViewOptions.propTypes = {
  ligandRep: PropTypes.string.isRequired,
  setLigandRep: PropTypes.func.isRequired,
  targetRep: PropTypes.string.isRequired,
  setTargetRep: PropTypes.func.isRequired,
};

export default ProteinViewOptions;