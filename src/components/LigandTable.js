import React from "react";
import PropTypes from "prop-types";

const LigandTable = props => {
  /**
   * A table of data for a given ligand.
   */

  const { ligand } = props;

  const data = ligand.properties;

  // Get list of properties, sorted in case they aren't always in the same
  // order in the SDF file - and remove molecule name property
  const properties = Object.keys(data).sort().filter(
    property => property !== "Molecule Name"
  );

  return (
    <table className="ligand-table">
      <tbody>
        {properties.map(property => (
          <tr key={property}><td>{property}</td><td>{data[property]}</td></tr>
        ))}
      </tbody>
    </table>
  );
};

LigandTable.propTypes = {
  ligand: PropTypes.object.isRequired
};

export default LigandTable;