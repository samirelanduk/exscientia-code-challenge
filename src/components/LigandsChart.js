import React, { useState } from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Select from "react-select";

function tooltipFormatter(tooltip) {
  const x = tooltip.chart.userOptions.xAxis.title.text;
  const y = tooltip.chart.userOptions.yAxis.title.text;
  const ligand = tooltip.chart.userOptions.ligands[this.point.index];
  return `<strong>${ligand.properties['Molecule Name']}</strong><br>
  <strong>${x}</strong>: ${this.point.x}<br>
  <strong>${y}</strong>: ${this.point.y}<br>`;
}

function pointClicked(e) {
  e.point.series.chart.userOptions.setSelectedLigand(
    e.point.ligandIndex
  );
}

const LigandsChart = props => {

  const { ligands, selectedLigand, setSelectedLigand } = props;
  console.log(ligands[0].properties["Molecule Name"])

  const [property1, setProperty1] = useState(0);
  const [property2, setProperty2] = useState(1);

  const properties = [... new Set(ligands.reduce((prev, curr) => [
    ...Object.keys(curr.properties), ...prev], []))
  ].filter(property => property !== "Molecule Name").sort();
  
  const data = ligands.map((ligand, index) => ({
    x: parseFloat(ligand.properties[properties[property1]]),
    y: parseFloat(ligand.properties[properties[property2]]),
    color: index === selectedLigand ? "#16a085" : "#ff710040",
    ligandIndex: index
  }));

  const options = {
    series: [{
      data, type: "scatter", events: {click: pointClicked},
      cursor: "pointer"
    }],
    chart: {zoomType: "xy", padding: 0},
    credits: {enabled: false},
    title: {text: null},
    legend: {enabled: false},
    xAxis: {title: {text: properties[property1]}},
    yAxis: {title: {text: properties[property2]}},
    tooltip: {
      formatter: tooltipFormatter,
      style: {lineHeight: "20"},
      borderRadius: 6,
      shadow: false
    },
    ligands,
    setSelectedLigand
  };

  const property1Options = properties.map((property, index) => ({
    value: index, label: property
  }));
  const property2Options = properties.map((property, index) => ({
    value: index, label: property
  }));

  return (
    <div className="ligands-chart">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="selectors">
        <Select
          options={property1Options}
          value={property1Options[property1]}
          onChange={e => setProperty1(e.value)}
          classNamePrefix="select"
          className="property-selector"
          menuPlacement="top"
        />
        <Select
          options={property2Options}
          value={property2Options[property2]}
          onChange={e => setProperty2(e.value)}
          classNamePrefix="select"
          className="property-selector"
          menuPlacement="top"
        />
      </div>
    </div>
  );
};

LigandsChart.propTypes = {
  
};

export default LigandsChart;