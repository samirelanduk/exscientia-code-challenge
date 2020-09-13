import { sdfToLigands } from "./sdf";
import fs from "fs";

// Integration tests
test("Provided file has correct PDB output", () => {
  fs.readFile("files/cdk2_ligs.sdf", {encoding: "utf-8"}, (error ,data) => {
    const ligands = sdfToLigands(data);
    expect(ligands.length).toBe(335);
    expect(ligands[0].pdb.split("\n").length).toBe(15);
    expect(ligands[0].pdb.split("\n")[0]).toBe(
      "HETATM    1  N   LIG A   1    27.8596 4.5054  65.2336   1.00                 N"
    );
  });
})

test("Provided file has correct data output", () => {
  fs.readFile("files/cdk2_ligs.sdf", {encoding: "utf-8"}, (error, data) => {
    const pdbs = sdfToLigands(data);
    expect(pdbs.length).toBe(335);
    expect(pdbs[0].data).toMatchObject({
      "Molecule Name": "VHNQIURBCCNWDN-PPMNOVJINA-N",
      "hs_clash": "0.0",
      "hs_total": "275.8073580037829",
      "Total Molweight": "109.132",
      "cLogP": "0.0069",
      "H-Acceptors": "3",
      "H-Donors": "2",
      "Polar Surface Area": "64.93",
      "Non-H Atoms": "8",
      "sp3-Atoms": "0"
    });
  });
})