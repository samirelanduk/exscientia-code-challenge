import { sdfToPdbs } from "./sdf";
import fs from "fs";

// Integration tests
test("Provided file has correct output", () => {
  fs.readFile("files/cdk2_ligs.sdf", {encoding: "utf-8"}, function(err,data) {
    const pdbs = sdfToPdbs(data);
    expect(pdbs.length).toBe(335);
    expect(pdbs[0].split("\n").length).toBe(15);
    expect(pdbs[0].split("\n")[0]).toBe(
      "HETATM    1  N   LIG A   1    27.8596 4.5054  65.2336   1.00                 N"
    );
  });
})