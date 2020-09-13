# Exscientia Code Challenge

## Setup

1. Clone repo to your local filesystem.
2. `cd` into repo.
3. Run `npm install`.
4. Start the app with `npm start`.
5. Go to [http://localhost:3004](http://localhost:3004) in your browser.

## Use

On loading you will be directed to select a PDB file containing the target
protein, and an SDF file containing docked ligands.

Once these are given, the display will show the target protein with the first
ligand docked. This is a 3D model, manipulatable with the mouse.

To the right, from top to bottom, are:

- The ligand selector, for switching between different ligands to view.
- The properties for the current ligand in a table.
- A 2D rendering of the current ligand.
- A scatter plot of all the ligands, with two properties plotted at any given time. Clicking on a point will change the current ligand.
