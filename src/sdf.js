export const sdfToLigands = sdfString => {
  /**
   * Takes an SDF file string and converts each ligand in it to a PDB file
   * string.
   */

  const ligandStrings = splitSdf(sdfString);
  return ligandStrings.map(ligandString => ({
    pdb: sdfLigandToPdbModel(ligandString),
    data: sdfLigandToDataObject(ligandString)
  }));
}


export const splitSdf = sdfString => {
  /**
   * Splits an SDF file string into its different molecule sections.
   */

  return sdfString.split("$$$$").map(s => s.trim()).filter(Boolean);
}


export const sdfLigandToPdbModel = sdfLigand => {
  /**
   * Converts the SDF file section corresponding to a single ligand to a PDB
   * string.
   */

  const coordinates = parseCoordinates(sdfLigand);
  const lines = coordinates.map(coordinatesToPdbAtom);
  return lines.join("\n");
}


export const parseCoordinates = sdfLigand => {
  /**
   * Takes an SDF file section corresponding to a single ligand and gets a list
   * of coordinates from it as a [element, x, y, z] array.
   */

  const coordinateLines = getCoordinates(sdfLigand);
  return coordinateLines.map(line => {
    const values = line.split(/[ ]+/);
    return [values[3]].concat(values.slice(4, 7).map(parseFloat));
  });
}


export const getCoordinates = sdfString => {
  /**
   * Takes the SDF filestring of a single ligand and gets the actual
   * coordinate lines.
   */

  const lines = sdfString.split(/\r?\n/);
  let inAtoms = false;
  const coordinates = [];
  for (let line of lines) {
    if (!inAtoms && line.includes("BEGIN ATOM")) {
      inAtoms = true;
      continue;
    }
    if (line.includes("END ATOM")) break;
    if (inAtoms) coordinates.push(line);
  }
  return coordinates;
}


const coordinatesToPdbAtom = (coordinates, index) => {
  /**
   * Takes a [element, x, y, z] array representing some atom and creates a PDB
   * HETATM record from it. An index should be supplied for the atom ID.
   */

  const record = "HETATM";
  const serial = (index + 1).toString().padStart(5, " ");
  const name = coordinates[0].toUpperCase().padEnd(3, " ");
  const x = coordinates[1].toString().padEnd(8, " ");
  const y = coordinates[2].toString().padEnd(8, " ");
  const z = coordinates[3].toString().padEnd(8, " ");
  const element = coordinates[0].toUpperCase().padStart(2, " ");
  return `${record}${serial}  ${name} LIG A   1    ${x}${y}${z}  1.00                ${element}`
}

export const sdfLigandToDataObject = sdfLigand => {
  /**
   * Converts the SDF file section corresponding to a single ligand to a data
   * object of its attributes.
   */

  const lines = sdfLigand.split("\n");
  const data = {};
  for (let l = 0; l < lines.length - 1; l++) {
    if (lines[l][0] === ">") {
      data[lines[l].match(/<(.+?)>/)[1]] = lines[l + 1];
    }
  }
  return data;
}