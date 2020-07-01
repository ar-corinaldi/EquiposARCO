import React from "react";
import Table from "react-bootstrap/Table";

function Precio(props) {
  const headers = [];
  const bodies = [];
  const hideFields = ["__v", "_id"];
  let counter = 0;
  for (const header in props.precio) {
    if (!hideFields.includes(header) && props.precio.hasOwnProperty(header)) {
      let element = props.precio[header];
      if (element === -1) element = 0;
      headers.push(<th key={`header-${header}-${counter + 1}`}>{header}</th>);
      bodies.push(<td key={`element-${element}-${counter + 1}`}>{element}</td>);
      counter++;
    }
  }

  return (
    <Table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        <tr>{bodies}</tr>
      </tbody>
    </Table>
  );
}

export default Precio;
